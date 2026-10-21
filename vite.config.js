import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Necesario para que Vitest transforme JSX en los tests
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    // Configuración explícita de coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'src/setupTests.js',
        'dist/',
        // Configuración y entrypoint: no son lógica de la app
        'vite.config.js',
        'eslint.config.js',
        'src/main.jsx',
        // Los propios tests no se miden a sí mismos
        'src/tests/**',
        '**/*.test.*',
        '**/*.spec.*',
      ],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 85,
        lines: 90,
      },
    },
  },
})
