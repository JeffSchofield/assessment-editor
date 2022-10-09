import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import { ReactElement } from 'react'

afterEach(() => cleanup()) // Make sure we clean up the renderer after each test

/** Custom render function to automatically wrap rendered components */
function customRender(ui: ReactElement, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => children,
    ...options
  })
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export { customRender as render } // Override render export with our custom one
