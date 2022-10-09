import React, { createContext, useContext, useState } from 'react'
import { art_assets } from 'virtual:art_assets'

const ArtAssetsContext = createContext(art_assets)

interface ArtAssetsProviderProps {
  children?: React.ReactNode
}

/** Provider which could be updated to fetch assets from a remote location */
export function ArtAssetsProvider({ children }: ArtAssetsProviderProps) {
  const [assets] = useState(art_assets)

  return (
    <ArtAssetsContext.Provider value={assets}>
      {children}
    </ArtAssetsContext.Provider>
  )
}

/** Get the app's current list of art assets */
export function useArtAssets() {
  const context = useContext(ArtAssetsContext)
  if (context == undefined)
    throw new Error('Unable to use art assets outside of component')
  return context
}
