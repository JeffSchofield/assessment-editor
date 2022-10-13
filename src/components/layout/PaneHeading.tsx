import React from 'react'

interface PaneHeadingProps {
  children?: React.ReactNode
}

/** Styled heading for a pane element. */
export function PaneHeading({ children }: PaneHeadingProps) {
  return (
    <div className="px-1/2 py-1/4 text-sm uppercase font-medium bg-gradient-to-r from-neutral-850 to-neutral-800">
      {children}
    </div>
  )
}
