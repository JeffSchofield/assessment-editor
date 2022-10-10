import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '../../utils'

import { FlatButton } from '../../../src/components/buttons/FlatButton'

describe('Flat Button Component', () => {
  it('should display the text passed in as a child', () => {
    const button_test_text = 'Test Content'
    const button = render(<FlatButton>{button_test_text}</FlatButton>)

    expect(button.baseElement).toHaveTextContent(button_test_text)
  })
})
