/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { assetsPlugin } from './src/lib/assets-plugin'

export default defineConfig({
  plugins: [react(), assetsPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts'
  }
})
