import { ArtAsset, ArtAssetCategory } from '../../src/types'

export const art_asset: ArtAsset = {
  id: 'e4bd2ad9-6411-4815-b415-d4e37456c499',
  name: 'Some Asset',
  src: '/tests/fixtures/artwork/some-asset.svg',
  content: {
    name: 'svg',
    type: 'element',
    value: '',
    attributes: {
      height: '50',
      width: '50',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    children: []
  },
  category_ids: []
}

export const art_assets: ArtAsset[] = [
  art_asset,
  {
    id: 'a6d8dfbf-b154-41f5-8a85-d5fc109bf5b2',
    name: 'Some Second Asset',
    src: '/tests/fixtures/artwork/some-second-asset.svg',
    content: {
      name: 'svg',
      type: 'element',
      value: '',
      attributes: {
        height: '50',
        width: '50',
        xmlns: 'http://www.w3.org/2000/svg'
      },
      children: []
    },
    category_ids: []
  }
]

export const art_asset_categories: ArtAssetCategory[] = [
  {
    id: '8777441a-36a1-4e22-b7bf-89885c909e44',
    name: 'Test Category 1',
    icon: 'asset-category-one'
  },
  {
    id: 'c464fb7e-ff5f-48a8-a5ed-b1738830f14a',
    name: 'Test Category 2',
    icon: 'asset-category-two'
  }
]
