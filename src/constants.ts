import { ArtAssetCategory, ProjectState } from './types'

/**
 * The initial state of the project store.
 */
export const INITIAL_PROJECT_STATE: ProjectState = {
  width: 500,
  height: 500,
  stage: []
}

/**
 * The list of asset categories used in asset metadata JSON files
 */
export const ASSET_CATEGORIES: ArtAssetCategory[] = [
  {
    id: '44ab10b4-aafc-40ea-a5f9-42655353757b',
    name: 'People',
    icon: 'asset-category-people'
  },
  {
    id: 'aeddbb22-f1bc-45c7-91ee-db0d30c5e974',
    name: 'Animals',
    icon: 'asset-category-animal'
  },
  {
    id: 'e7c60817-ec70-44fe-8c84-7de2069159fb',
    name: 'Vehicles',
    icon: 'asset-category-vehicle'
  }
]
