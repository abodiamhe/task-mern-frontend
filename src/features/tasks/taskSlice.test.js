import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import taskReducer, { getTasks, createTask, deleteTask } from './taskSlice';
import taskService from './taskService';

// 👇 Mock the entire taskService module
// so when getTasks/createTask/deleteTask are called,
// they use our fake implementations instead of making real API requests
// 👉 Vitest intercepts the import of ./taskService and replaces everything it exports with mock functions.
vi.mock('./taskService');

describe('taskSlice', () => {
  let store; //create fresh store on every test

  // ✅ Setup a fresh store before each test
  beforeEach(() => {
    store = configureStore({
      reducer: {
        task: taskReducer,
        // Mocking the auth slice since task thunks need a user token
        auth: (state = { user: { token: 'fake-token' } }) => state,
      },
    });

    // Reset all mocks to ensure no test leaks into another
    vi.clearAllMocks();
  });

  // -------------------------
  // 🔹 Initial State Test
  // -------------------------
  test('should handle initial state', () => {
    const state = store.getState().task;

    // The reducer’s default state should match this
    expect(state).toEqual({
      tasks: [],
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: '',
    });
  });

  // -------------------------
  // 🔹 getTasks Test
  // -------------------------
  test('getTasks fulfilled updates state with tasks', async () => {
    const mockTasks = [
      {
        _id: '649e4e271947362dc297436a',
        text: 'Learn Tailwind',
        user: '649023b41935f5557f8e7ca4',
        createdAt: '2025-08-12T16:16:48.271+00:00',
        updatedAt: '2025-08-12T16:21:55.829+00:00',
        __v: 0,
      },
    ];
    const token = 'fake-token';

    // Mock service to resolve with fake tasks
    taskService.getTasks.mockResolvedValue(mockTasks);

    // Dispatch async thunk
    await store.dispatch(getTasks());

    // Check updated state
    const state = store.getState().task;

    expect(state.isSuccess).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.tasks).toEqual(mockTasks);
    expect(taskService.getTasks).toHaveBeenCalledWith(token);
  });

  // -------------------------
  // 🔹 createTask Test
  // -------------------------
  test('createTask fulfilled pushes new task', async () => {
    const newTask = { _id: '2', text: 'New Task' };

    // Mock service to return newly created task
    taskService.createTask.mockResolvedValue(newTask);

    // Dispatch async thunk
    await store.dispatch(createTask({ text: 'New Task' }));

    // The new task should now exist in state
    const state = store.getState().task;

    expect(state.tasks).toContainEqual(newTask);
  });

  // -------------------------
  // 🔹 deleteTask Test
  // -------------------------
  test('deleteTask fulfilled removes a task', async () => {
    // Re-initialize store with a preloaded task
    store = configureStore({
      reducer: {
        task: taskReducer,
        auth: (state = { user: { token: 'fake-token' } }) => state,
      },
      preloadedState: {
        task: {
          tasks: [{ _id: '1', text: 'Task to delete' }],
          isError: false,
          isSuccess: false,
          isLoading: false,
          message: '',
        },
      },
    });

    // Mock API response for delete
    taskService.deleteTask.mockResolvedValue({ id: '1' });

    // Dispatch async thunk
    await store.dispatch(deleteTask('1'));

    // State should now have empty task list
    const state = store.getState().task;
    expect(state.tasks).toEqual([]);
  });
});
