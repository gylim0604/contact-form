import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		// support `describe`, `test` etc. globally,
		// so you don't need to import them every time
		globals: true,
		// run tests in jsdom environment
		environment: 'jsdom',
		// global test setup
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
