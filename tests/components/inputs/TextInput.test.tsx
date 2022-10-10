import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, userEvent, screen } from '../../utils'

import { TextInput } from '../../../src/components/inputs/TextInput'

describe('Text Input Component', () => {
  it('should take a default value', () => {
    const default_value = 'Test Value'
    const text_input = render(<TextInput defaultValue={default_value} />)
    const input = text_input.getByRole('textbox')

    expect(input).toHaveValue(default_value)
  })

  it('should call `onInput` when typed in', async () => {
    const test_input = 'test input'
    const event_handlers = {
      handleInput() {
        return undefined
      }
    }

    const input_event_spy = vi.spyOn(event_handlers, 'handleInput')
    const user = userEvent.setup() // Set up a session with user-event

    render(<TextInput onInput={event_handlers.handleInput} />)

    await user.type(screen.getByRole('textbox'), test_input)

    expect(input_event_spy).toHaveBeenCalledTimes(test_input.length)
  })

  it('should accept a placeholder', () => {
    const placeholder_value = 'test placeholder'
    render(<TextInput placeholder={placeholder_value} />)
    const input = screen.queryByPlaceholderText(placeholder_value)
    expect(input).toBeTruthy()
  })

  it('should display an icon on the left', () => {
    const icon_value = 'test-icon'
    const button = render(<TextInput leftIcon={icon_value} />)

    const leftIcon = button.queryByTestId('text-left-icon')

    expect(leftIcon).toBeTruthy()
  })

  it('should display an icon on the right', () => {
    const icon_value = 'test-icon'
    const button = render(<TextInput rightIcon={icon_value} />)

    const rightIcon = button.queryByTestId('text-right-icon')

    expect(rightIcon).toBeTruthy()
  })
})
