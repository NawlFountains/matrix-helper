import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { configDefaults } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
	  react(),
	  tailwindcss()
  ],
  test: {
	  include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	  exclude: [...configDefaults.exclude, 'tests/**'],
	  environment: 'node', 
  },
})
