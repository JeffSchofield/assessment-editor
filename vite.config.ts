/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { assetsPlugin } from './src/lib/assets-plugin'

export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')]
    }),
    assetsPlugin()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts'
  }
})
