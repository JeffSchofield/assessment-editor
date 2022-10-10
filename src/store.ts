import { configureStore } from '@reduxjs/toolkit'
import project_reducer from './stores/project'

// Create app-level store
export const store = configureStore({
  reducer: {
    project: project_reducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
