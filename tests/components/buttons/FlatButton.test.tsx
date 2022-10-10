import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, fireEvent, screen } from '../../utils'

import { FlatButton } from '../../../src/components/buttons/FlatButton'

describe('Flat Button Component', () => {
  const button_test_text = 'Test Content'
  it('should display the text passed in as a child', () => {
    const button = render(<FlatButton>{button_test_text}</FlatButton>)

    expect(button.baseElement).toHaveTextContent(button_test_text)
  })

  it('should call `onClick` when clicked', () => {
    const event_handlers = {
      handleClick() {
        return undefined
      }
    }

    const spy = vi.spyOn(event_handlers, 'handleClick')

    render(
      <FlatButton onClick={event_handlers.handleClick}>
        {button_test_text}
      </FlatButton>
    )

    fireEvent.click(screen.getByText(button_test_text))
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
