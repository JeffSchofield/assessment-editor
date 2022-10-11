import { describe, expect, it } from 'vitest'
import { INITIAL_PROJECT_STATE } from '../../src/constants'
import project_reducer, {
  addObject,
  deleteObject,
  setHeight,
  setStage,
  setWidth,
  updateObject
} from '../../src/stores/project'
import { StageObjectType } from '../../src/types'

describe('Project Store', () => {
  it('should return the initial state', () => {
    expect(project_reducer(undefined, { type: undefined })).toEqual(
      INITIAL_PROJECT_STATE
    )
  })

  it('should set the project width to 250', () => {
    expect(project_reducer(undefined, setWidth(250)).width).toEqual(250)
  })

  it('should set the project height to 100', () => {
    expect(project_reducer(undefined, setHeight(100)).height).toEqual(100)
  })

  describe('Project Stage CRUD', () => {
    let state = project_reducer(undefined, { type: undefined })

    it('should add an object to the stage', () => {
      state = project_reducer(state, addObject({ type: 0 }))

      expect(state.stage).toHaveLength(1)
      expect(state.stage[0].type).toEqual(0)
    })

    it('should update an object on the stage', () => {
      state = project_reducer(
        state,
        updateObject({ id: state.stage[0].id, data: { type: 1 } })
      )

      expect(state.stage[0].type).toEqual(1)
    })

    it('should delete an object from the stage', () => {
      state = project_reducer(state, deleteObject(state.stage[0].id))

      expect(state.stage).toHaveLength(0)
    })

    it('should set the stage manually', () => {
      state = project_reducer(state, setStage([{ id: 'test-id', type: 0 }]))

      expect(state.stage).toHaveLength(1)
      expect(state.stage[0].id).toEqual('test-id')
    })
  })
})
