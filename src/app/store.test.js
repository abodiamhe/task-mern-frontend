import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/tasks/taskSlice';
import { describe, expect, test } from 'vitest';

describe('store', () => {
  test('Creates the store with the correct reducers', () => {
    const store = configureStore({
      reducer: { auth: authReducer, tasks: taskReducer },
    });

    //Have access to the reducer state
    const storeReducers = store.getState();
    //check if 'auth' is present in the reducer
    expect(storeReducers).toHaveProperty('auth');
    expect(storeReducers).toHaveProperty('tasks');
  });
});
