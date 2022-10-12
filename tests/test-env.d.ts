import 'vitest'

declare global {
  namespace Vi {
    /* eslint-disable */
    interface Assertion<T = any> {
      toHaveTextContent(text: string): void
      toHaveValue(value: any): void
    }
  }
}
