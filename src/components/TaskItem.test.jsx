import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TaskItem from './TaskItem';
import { describe, expect, test } from 'vitest';

// A dummy reducer so configureStore works
const dummyReducer = (state = {}) => state;

describe('TaskItem', () => {
  const task = {
    _id: 'task-123',
    createdAt: '2025-08-12T16:16:48.271+00:00',
    text: 'Learn Tailwind',
  };

  // Create store with dummy reducer
  const store = configureStore({
    reducer: { dummy: dummyReducer },
  });

  test('renders task details correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TaskItem task={task} />
      </Provider>
    );

    expect(getByText(task.text)).toBeInTheDocument();
    expect(getByText(new Date(task.createdAt).toLocaleString('en-US'))).toBeInTheDocument();
  });
});
