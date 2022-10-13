import { useContext } from 'react'
import { createContext } from 'react'

interface EditorContext {
  selected_asset?: string
  setSelectedAsset(asset: string): void
  deselectAsset(): void
}

export const EditorContext = createContext<EditorContext | undefined>(undefined)

export function useEditorContext() {
  const context = useContext(EditorContext)
  if (context == undefined)
    throw new Error('Unable to use editor context outside of component')
  return context
}
