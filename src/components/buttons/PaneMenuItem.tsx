import React from 'react'
import { SvgIcon } from '../media/SvgIcon'

enum PaneMenuItemDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

interface PaneMenuItemProps {
  /** The label to display. */
  label: string

  /** The icon to display. */
  icon: string

  /** Whether or not the menu item is active. */
  isActive?: boolean

  /** Which direction the active state should indicate. */
  direction?: PaneMenuItemDirection | 'left' | 'right' | 'up' | 'down'
}

/** A menu button with direction to be used within a pane. */
export function PaneMenuItem({
  label,
  icon,
  isActive,
  className = '',
  direction = PaneMenuItemDirection.RIGHT,
  ...props
}: PaneMenuItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  let direction_classes = 'after:border-r-1/8'
  if (direction == PaneMenuItemDirection.UP)
    direction_classes = 'after:border-t-1/8'
  else if (direction == PaneMenuItemDirection.DOWN)
    direction_classes = 'after:border-b-1/8'
  else if (direction == PaneMenuItemDirection.LEFT)
    direction_classes = 'after:border-l-1/8'

  const active_button_classes = isActive
    ? 'bg-primary-700/25 text-primary-300 after:absolute after:inset-0 after:border-primary-500 ' +
      direction_classes
    : ''
  const button_classes =
    className +
    ' relative flex flex-col items-center p-1/2 transition-color duration-100 can-hover:hover:bg-neutral-100/10 active:!bg-neutral-100/20 ' +
    active_button_classes

  const active_text_classes = isActive ? '' : 'text-neutral-400'
  const text_classes = `text-xs ${active_text_classes}`
  return (
    <button className={button_classes} data-direction={direction} {...props}>
      <SvgIcon name={icon} className="h-1" />
      <div className={text_classes}>{label}</div>
    </button>
  )
}
