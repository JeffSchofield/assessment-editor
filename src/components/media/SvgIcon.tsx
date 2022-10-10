import React from 'react'

interface SvgIconProps {
  /** The name of the icon */
  name: string

  /** Optional prefix if there are multiple icon sets */
  prefix?: string
}

/** Icon component */
export function SvgIcon({
  name,
  prefix = 'icon',
  ...props
}: SvgIconProps & React.SVGAttributes<SVGElement>) {
  const symbolId = `#${prefix}-${name}`

  return (
    <svg viewBox="0 0 1 1" {...props} aria-hidden="true">
      <use href={symbolId} data-testid="use" className="fill-current" />
    </svg>
  )
}
