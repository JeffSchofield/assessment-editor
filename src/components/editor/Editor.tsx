import React from 'react'
import { PaneHeading } from '../layout/PaneHeading'
import { EditorAssetPane } from './AssetPane'
import { Stage, Layer, Rect } from 'react-konva'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { isArtAssetStageObject } from '../../utils'
import { EditorArtAssetStageObject } from './objects/ArtAssetStageObject'
import { useArtAssets } from '../../contexts/assets'
import { ArtAsset, ArtAssetStageObject, StageObjectType } from '../../types'
import { addObject } from '../../stores/project'

/**
 * Creates an instance of the visual editor.
 */
export function Editor({
  className = '',
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const project = useAppSelector(state => state.project)
  const dispatch = useAppDispatch()
  const art_assets = useArtAssets()

  /**
   * Asset pane item selection handling
   */
  function handleAssetClick(asset: ArtAsset) {
    dispatch(
      addObject({
        type: StageObjectType.ART_ASSET,
        x: 0,
        y: 0,
        scale: { x: 1, y: 1 },
        rotation: 0,
        asset_id: asset.id
      } as Omit<ArtAssetStageObject, 'id'>)
    )
  }

  /**
   * Build stage content
   */
  const stage_content = project.stage.map(stage_object => {
    if (isArtAssetStageObject(stage_object)) {
      return (
        <EditorArtAssetStageObject
          key={stage_object.id}
          x={stage_object.x}
          y={stage_object.y}
          scale={stage_object.scale}
          rotation={stage_object.rotation}
          art_asset={art_assets.find(
            asset => asset.id == stage_object.asset_id
          )}
        />
      )
    }
  })

  return (
    <div className={className + ' h-full flex'} {...props}>
      {/* Left Pane */}
      <div className="flex flex-col w-14 bg-neutral-850">
        {/* Assets Pane */}
        <PaneHeading>Assets</PaneHeading>
        <EditorAssetPane className="flex-1" onAssetClick={handleAssetClick} />
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
          <Layer data-testid="project-content-layer">{stage_content}</Layer>
        </Stage>
      </div>
    </div>
  )
}
