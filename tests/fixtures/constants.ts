import { ArtAsset } from '../../src/types'

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
