import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, fireEvent, screen } from '../../utils'

import { PaneMenuItem } from '../../../src/components/buttons/PaneMenuItem'

describe('Pane Menu Item Component', () => {
  const menu_item_label = 'Test Label'
  const menu_item_icon = 'test-icon'
  it('should display the label and icon', () => {
    const menu_item = render(
      <PaneMenuItem label={menu_item_label} icon={menu_item_icon} />
    )

    expect(menu_item.baseElement).toHaveTextContent(menu_item_label)
    expect(menu_item.getByTestId('use').getAttribute('href')).toEqual(
      `#icon-${menu_item_icon}`
    )
  })

  it('should call `onClick` when clicked', () => {
    const event_handlers = {
      handleClick() {
        return undefined
      }
    }

    const spy = vi.spyOn(event_handlers, 'handleClick')

    render(
      <PaneMenuItem
        label={menu_item_label}
        icon={menu_item_icon}
        onClick={event_handlers.handleClick}
        data-testid="menu_item"
      />
    )

    fireEvent.click(screen.getByTestId('menu_item'))
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should take a direction prop', () => {
    render(
      <PaneMenuItem
        label={menu_item_label}
        icon={menu_item_icon}
        direction="up"
        data-testid="menu_item"
      />
    )

    const menu_item = screen.getByTestId('menu_item')
    expect(menu_item.dataset.direction).toEqual('up')
  })
})
