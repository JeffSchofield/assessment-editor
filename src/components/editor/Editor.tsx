import React, {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  useRef,
  useState
} from 'react'
import { PaneHeading } from '../layout/PaneHeading'
import { EditorAssetPane } from './AssetPane'
import { Stage, Layer, Rect } from 'react-konva'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { isArtAssetStageObject } from '../../utils'
import { EditorArtAssetStageObject } from './objects/ArtAssetStageObject'
import { useArtAssets } from '../../contexts/assets'
import { Stage as StageType } from 'konva/lib/Stage'
import { KonvaEventObject } from 'konva/lib/Node'
import { ArtAsset, ArtAssetStageObject, StageObjectType } from '../../types'
import { addObject } from '../../stores/project'

/**
 * Creates an instance of the visual editor.
 */
export function Editor({
  className = '',
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const stage_ref = useRef<StageType>(null)
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
   * Asset stage object selection
   */
  const [selected_asset, setSelectedAsset] = useState<string | undefined>()

  /** Deselect if any asset is currently selected. */
  function deselectAsset() {
    setSelectedAsset(undefined)
  }

  /** Check to make sure the click is outside the stage and deselect if it is. */
  function checkOutsideStageAndDeselect(
    e: ReactMouseEvent<HTMLDivElement> | ReactTouchEvent<HTMLDivElement>
  ) {
    if (
      stage_ref.current?.content &&
      (e.target as HTMLDivElement).contains(stage_ref.current?.content)
    )
      deselectAsset()
  }

  /** Make sure the clicked area is an empty part of the stage and deselects if it is. */
  function checkEmptyAreaAndDeslect(
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
  ) {
    if (e.target === e.target.getStage() || e.target.id() == 'stage-background')
      deselectAsset()
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
          isSelected={selected_asset == stage_object.id}
          onSelect={() => setSelectedAsset(stage_object.id)}
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
      <div
        className="flex-1 flex items-center justify-center"
        onMouseDown={checkOutsideStageAndDeselect}
        onTouchStart={checkOutsideStageAndDeselect}
      >
        <Stage
          ref={stage_ref}
          className="shadow-md"
          width={project.width}
          height={project.height}
          onMouseDown={checkEmptyAreaAndDeslect}
          onTouchStart={checkEmptyAreaAndDeslect}
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
