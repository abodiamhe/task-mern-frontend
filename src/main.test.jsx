import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { expect, test } from 'vitest';

test('renders the root component correctly', () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const rootComponent = container.firstChild;

  expect(rootComponent).toBeInTheDocument();
});
