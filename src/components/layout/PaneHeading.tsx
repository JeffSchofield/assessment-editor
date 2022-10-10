import React from 'react'

interface PaneHeadingProps {
  children?: React.ReactNode
}

/** Styled heading for a pane element. */
export function PaneHeading({ children }: PaneHeadingProps) {
  return (
    <div className="p-1/2 text-sm uppercase font-medium bg-neutral-800">
      {children}
    </div>
  )
}
