import React from 'react'
import { useAppDispatch } from '../../hooks'
import { FlatButton } from '../buttons/FlatButton'
import { PaneHeading } from '../layout/PaneHeading'
import { useEditorContext } from '../../contexts/editor'
import { deleteObject } from '../../stores/project'

export function EditorObjectPane() {
  const dispatch = useAppDispatch()
  const { selected_asset, deselectAsset } = useEditorContext()

  /**
   * Stage Object Delete
   */

  function handleObjectDeleteClick() {
    if (selected_asset) dispatch(deleteObject(selected_asset))
    deselectAsset()
  }

  return (
    <React.Fragment>
      <PaneHeading>Object</PaneHeading>
      <div className="p-1/2">
        <FlatButton onClick={handleObjectDeleteClick}>Delete</FlatButton>
      </div>
    </React.Fragment>
  )
}
