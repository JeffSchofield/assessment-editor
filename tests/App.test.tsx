import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from './utils'
import App from '../src/App'

describe('Main App', () => {
  it('should render the main app and editor', () => {
    const app = render(<App />)

    expect(app.queryByTestId('editor')).toBeTruthy()
  })
})
