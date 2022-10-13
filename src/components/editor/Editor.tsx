import React, {
  DragEvent as ReactDragEvent,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  useRef,
  useState
} from 'react'
import { PaneHeading } from '../layout/PaneHeading'
import { EditorAssetPane } from './AssetPane'
import { Stage, Layer, Rect } from 'react-konva'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { downloadURI, isArtAssetStageObject } from '../../utils'
import { EditorArtAssetStageObject } from './objects/ArtAssetStageObject'
import { useArtAssets } from '../../contexts/assets'
import { Stage as StageType } from 'konva/lib/Stage'
import { KonvaEventObject } from 'konva/lib/Node'
import { ArtAsset, ArtAssetStageObject, StageObjectType } from '../../types'
import { addObject, deleteObject, updateObject } from '../../stores/project'
import { FlatButton } from '../buttons/FlatButton'
import { useKey } from 'rooks'
import { EditorStagePane } from './StagePane'
import { EditorObjectPane } from './ObjectPane'
import { EditorContext } from '../../contexts/editor'

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
   * Drop handling
   */
  function handleDrop(e: ReactDragEvent) {
    if (stage_ref.current) {
      e.preventDefault()

      stage_ref.current.setPointersPositions(e)
      const [asset_id, width, height] = e.dataTransfer
        .getData('text/plain')
        .split(':') // Deserialize the data transfer object

      // Make sure there is an asset by this ID in the assets list and create the object
      if (asset_id && art_assets.find(asset => asset.id == asset_id)) {
        const { x, y } = stage_ref.current.getPointerPosition() || {
          x: 0,
          y: 0
        }

        dispatch(
          addObject({
            type: StageObjectType.ART_ASSET,
            x: x - parseFloat(width) / 2,
            y: y - parseFloat(height) / 2,
            scale: { x: 1, y: 1 },
            rotation: 0,
            asset_id
          } as ArtAssetStageObject)
        )
      }
    }
  }

  /**
   * Keyboard commands
   */

  // Delete object
  useKey(['Delete'], () => {
    // Make sure an object is selected
    if (selected_object != undefined) {
      dispatch(deleteObject(selected_object))
      setSelectedObject(undefined) // Unset the selected object
    }
  })

  /**
   * Stage object selection
   */
  const [selected_object, setSelectedObject] = useState<string | undefined>()

  /** Deselect if any object is currently selected. */
  function deselectObject() {
    setSelectedObject(undefined)
  }

  /** Check to make sure the click is outside the stage and deselect if it is. */
  function checkOutsideStageAndDeselect(
    e: ReactMouseEvent<HTMLDivElement> | ReactTouchEvent<HTMLDivElement>
  ) {
    if (
      stage_ref.current?.content &&
      (e.target as HTMLDivElement).contains(stage_ref.current?.content)
    )
      deselectObject()
  }

  /** Make sure the clicked area is an empty part of the stage and deselects if it is. */
  function checkEmptyAreaAndDeslect(
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
  ) {
    if (e.target === e.target.getStage() || e.target.id() == 'stage-background')
      deselectObject()
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
          isSelected={selected_object == stage_object.id}
          onSelect={() => setSelectedObject(stage_object.id)}
          onChange={data =>
            dispatch(updateObject({ id: stage_object.id, data }))
          }
        />
      )
    }
  })

  /**
   * Save function
   */
  /** Save the project as a PNG. */
  function saveProject() {
    if (stage_ref.current) {
      const data_url = stage_ref.current.toDataURL() // Use the stage ref to get the stage canvas' data URL
      downloadURI(data_url, 'Project.png') // Download it with file name
    }
  }

  return (
    <EditorContext.Provider
      value={{ selected_object, setSelectedObject, deselectObject }}
    >
      <div className={className + ' h-full flex'} {...props}>
        {/* Left Pane */}
        <div className="flex flex-col w-14 bg-neutral-850">
          {/* Assets Pane */}
          <PaneHeading>Assets</PaneHeading>
          <EditorAssetPane className="flex-1" onAssetClick={handleAssetClick} />

          {/* Save */}
          <div className="p-1/2 bg-gradient-to-br from-neutral-750 to-neutral-800">
            <FlatButton className="w-full" onClick={saveProject}>
              Save Artwork
            </FlatButton>
          </div>
        </div>

        {/* Main Viewport */}
        <div
          className="flex-1 flex items-center justify-center"
          onMouseDown={checkOutsideStageAndDeselect}
          onTouchStart={checkOutsideStageAndDeselect}
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
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

        {/* Right Pane */}
        <div className="flex flex-col w-14 bg-neutral-875">
          {/* Stage Pane */}
          {selected_object == undefined && <EditorStagePane />}
          {/* Object Pane */}
          {selected_object && <EditorObjectPane />}
        </div>
      </div>
    </EditorContext.Provider>
  )
}
