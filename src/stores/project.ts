import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INITIAL_PROJECT_STATE } from '../constants'
import { StageObject } from '../types'
import { nanoid } from 'nanoid'

/**
 * Central store for the app's current project
 */
const project_slice = createSlice({
  name: 'project',
  initialState: INITIAL_PROJECT_STATE,
  reducers: {
    /** Set the project's width */
    setWidth(state, { payload }: PayloadAction<number>) {
      state.width = payload
    },
    /** Set the project's height */
    setHeight(state, { payload }: PayloadAction<number>) {
      state.height = payload
    },
    /** Set the entire stage array */
    setStage(state, { payload }: PayloadAction<StageObject[]>) {
      state.stage = payload
    },
    /** Add an object to the stage */
    addObject(state, { payload }: PayloadAction<Omit<StageObject, 'id'>>) {
      state.stage.push({
        id: nanoid(),
        ...payload
      })
    },
    /** Update an object on the stage */
    updateObject(
      state,
      {
        payload
      }: PayloadAction<{ id: string; data: Partial<Omit<StageObject, 'id'>> }>
    ) {
      const object_index = state.stage.findIndex(
        object => object.id == payload.id
      )
      Object.assign(state.stage[object_index], payload.data)
    },
    /** Remove an object from the stage */
    deleteObject(state, { payload }: PayloadAction<string>) {
      const object_index = state.stage.findIndex(object => object.id == payload)
      if (object_index >= 0) state.stage.splice(object_index, 1)
    }
  }
})

export const {
  setWidth,
  setHeight,
  setStage,
  addObject,
  updateObject,
  deleteObject
} = project_slice.actions
export default project_slice.reducer
