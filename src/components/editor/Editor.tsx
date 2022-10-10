import React from 'react'
import { PaneHeading } from '../layout/PaneHeading'
import { EditorAssetPane } from './AssetPane'

/**
 * Creates an instance of the visual editor.
 */
export function Editor({
  className = '',
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className + ' h-full flex'} {...props}>
      {/* Left Pane */}
      <div className="flex flex-col w-14 bg-neutral-850">
        {/* Assets Pane */}
        <PaneHeading>Assets</PaneHeading>
        <EditorAssetPane className="flex-1" />
      </div>

      {/* Main Viewport */}
      <div className="flex-1 flex items-center justify-center"></div>
    </div>
  )
}
