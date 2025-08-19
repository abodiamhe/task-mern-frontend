import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api': 'http://localhost:8000',
      '/api': 'https://taskmernbackend-aboby3n7.b4a.run',
    },
  },
  test: {
    globals: true, // let us use describe/it/expect without imports
    environment: 'jsdom', // simulate browser for React Testing Library
    setupFiles: './src/setupTests.js', // 👈 tell Vitest where your setup file is
    coverage: {
      provider: 'v8', // use V8 engine for coverage
      reportsDirectory: './coverage',
      reporter: ['text', 'json', 'html'],
      lines: 80, // fail tests if <80% lines covered
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
});

//setupFiles: './src/setupTests.js',
