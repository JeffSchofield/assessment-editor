import { Group as GroupElement, GroupConfig } from 'konva/lib/Group'
import { KonvaEventObject } from 'konva/lib/Node'
import { Transformer as TransformerElement } from 'konva/lib/shapes/Transformer'
import React, { useEffect, useRef } from 'react'
import { Group, Transformer } from 'react-konva'
import { ArtAsset, StageObject } from '../../../types'
import { svgsonToKonvaPaths } from '../utils'

interface EditorArtAssetStageObjectProps {
  /** The art asset to render. */
  art_asset: ArtAsset

  /** Whether or not the stage object is selected. */
  isSelected?: boolean

  /** Called when the stage object is selected. */
  onSelect?: () => void

  /** Called when the stage object is dragged or transformed. */
  onChange?: (e: Omit<StageObject, 'id' | 'type'>) => void
}

/** A stage object that renders an art asset. */
export function EditorArtAssetStageObject({
  art_asset,
  isSelected,
  onSelect,
  onChange,
  ...props
}: EditorArtAssetStageObjectProps & GroupConfig) {
  const group_ref = useRef<GroupElement>(null)
  const transformer_ref = useRef<TransformerElement>(null)

  // Manually attach the transformer nodes
  useEffect(() => {
    if (isSelected && group_ref.current && transformer_ref.current) {
      // we need to attach transformer manually
      transformer_ref.current.nodes([group_ref.current])
      transformer_ref.current.getLayer()?.batchDraw()
    }
  }, [isSelected])

  // Emit change events after drag or transform
  function handleChangeUpdate(e: KonvaEventObject<any>) {
    if (onChange) {
      const shape = e.target
      onChange({
        x: shape.x(),
        y: shape.y(),
        scale: shape.scale() || { x: 1, y: 1 },
        rotation: shape.rotation()
      })
    }
  }

  return (
    <React.Fragment>
      <Group
        ref={group_ref}
        onClick={onSelect}
        onTap={onSelect}
        draggable
        onDragStart={onSelect}
        onDragEnd={handleChangeUpdate}
        onTransformEnd={handleChangeUpdate}
        {...props}
      >
        {svgsonToKonvaPaths(art_asset.content)}
      </Group>
      {isSelected && <Transformer ref={transformer_ref}></Transformer>}
    </React.Fragment>
  )
}
