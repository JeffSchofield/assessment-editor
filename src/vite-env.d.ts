/// <reference types="vite/client" />

// Add virtual import types
declare module 'virtual:art_assets' {
  import { ArtAsset } from './types'

  /** Art assets compiled from the `/src/assets/artwork` folder */
  export const art_assets: ArtAsset[]
}
