import React from 'react'
import { useAppDispatch } from '../../hooks'
import { FlatButton } from '../buttons/FlatButton'
import { PaneHeading } from '../layout/PaneHeading'
import { useEditorContext } from '../../contexts/editor'
import { deleteObject } from '../../stores/project'

export function EditorObjectPane() {
  const dispatch = useAppDispatch()
  const { selected_object, deselectObject } = useEditorContext()

  /**
   * Stage Object Delete
   */

  function handleObjectDeleteClick() {
    if (selected_object) dispatch(deleteObject(selected_object))
    deselectObject()
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
