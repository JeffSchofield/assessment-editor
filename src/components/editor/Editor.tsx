import React from 'react'
import { PaneHeading } from '../layout/PaneHeading'
import { EditorAssetPane } from './AssetPane'
import { Stage, Layer, Rect } from 'react-konva'
import { useAppSelector } from '../../hooks'

/**
 * Creates an instance of the visual editor.
 */
export function Editor({
  className = '',
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const project = useAppSelector(state => state.project)

  return (
    <div className={className + ' h-full flex'} {...props}>
      {/* Left Pane */}
      <div className="flex flex-col w-14 bg-neutral-850">
        {/* Assets Pane */}
        <PaneHeading>Assets</PaneHeading>
        <EditorAssetPane className="flex-1" />
      </div>

      {/* Main Viewport */}
      <div className="flex-1 flex items-center justify-center">
        <Stage
          className="shadow-md"
          width={project.width}
          height={project.height}
        >
          <Layer>
            <Rect
              id="stage-background"
              width={project.width}
              height={project.height}
              fill="white"
            />
          </Layer>
          <Layer data-testid="project-content-layer"></Layer>
        </Stage>
      </div>
    </div>
  )
}
