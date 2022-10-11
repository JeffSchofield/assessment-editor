import { configureStore } from '@reduxjs/toolkit'
import project_reducer from './stores/project'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Create a persisted version of the project reducer using the localstorage engine from `redux-persist`.
const persisted_project_reducer = persistReducer(
  { key: 'project', storage },
  project_reducer
)

// Create app-level store
export const store = configureStore({
  reducer: {
    project: persisted_project_reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }) // Disable serializable check to suppress warning
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
