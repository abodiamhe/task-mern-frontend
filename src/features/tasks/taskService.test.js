import axios from 'axios';
import taskService from './taskService';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// 🛑 Mock axios so we don’t make real API requests
vi.mock('axios');

describe('taskService', () => {
  const token = 'fake-token'; // ✅ our fake token for auth

  // 🔄 Reset mocks before each test so they don’t interfere
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('getTasks should call API with token and return data', async () => {
    // 🎯 Arrange
    const mockTasks = [{ _id: '1', text: 'Test Task' }];
    // 👉 Tell axios.get to "pretend" it got this response
    axios.get.mockResolvedValue({ data: mockTasks });

    // 🧪 Act
    const response = await taskService.getTasks(token);

    // ✅ Assert
    // Check axios was called with correct URL + headers
    expect(axios.get).toHaveBeenCalledWith('/api/tasks/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Check function returned the same mock data
    expect(response).toEqual(mockTasks);
  });

  test('createTask should call API with taskData and token', async () => {
    // 🎯 Arrange
    const taskData = { text: 'New Task' };
    const mockResponse = { _id: '2', text: 'New Task' };
    // 👉 axios.post will return this mock response
    axios.post.mockResolvedValue({ data: mockResponse });

    // 🧪 Act
    const response = await taskService.createTask(taskData, token);

    // ✅ Assert
    expect(axios.post).toHaveBeenCalledWith('/api/tasks/', taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response).toEqual(mockResponse);
  });

  test('deleteTask should call API with taskId and token', async () => {
    // 🎯 Arrange
    const taskId = '1';
    const mockResponse = { message: 'Task deleted' };
    // 👉 axios.delete will return this mock response
    axios.delete.mockResolvedValue({ data: mockResponse });

    // 🧪 Act
    const response = await taskService.deleteTask(taskId, token);

    // ✅ Assert
    expect(axios.delete).toHaveBeenCalledWith(`/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response).toEqual(mockResponse);
  });
});
