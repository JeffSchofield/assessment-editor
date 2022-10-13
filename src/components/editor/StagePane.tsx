import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setHeight, setWidth } from '../../stores/project'
import { TextInput } from '../inputs/TextInput'
import { PaneHeading } from '../layout/PaneHeading'

export function EditorStagePane() {
  const project = useAppSelector(state => state.project)
  const dispatch = useAppDispatch()
  return (
    <React.Fragment>
      <PaneHeading>Stage</PaneHeading>
      <div className="p-1/2">
        <div className="flex gap-1/2">
          <div>
            <label htmlFor="stage-width" className="text-xs font-medium">
              Width
            </label>
            <TextInput
              id="stage-width"
              defaultValue={project.width}
              onChange={e => dispatch(setWidth(parseInt(e.target.value)))}
            />
          </div>
          <div>
            <label htmlFor="stage-height" className="text-xs font-medium">
              Height
            </label>
            <TextInput
              id="stage-height"
              defaultValue={project.height}
              onChange={e => dispatch(setHeight(parseInt(e.target.value)))}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
