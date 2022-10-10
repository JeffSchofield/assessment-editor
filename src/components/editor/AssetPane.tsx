import React, { useState } from 'react'
import { PaneMenuItem } from '../buttons/PaneMenuItem'
import { useArtAssets, useAssetCategories } from '../../contexts/assets'
import { EditorArtAssetMenuItem } from './ArtAssetMenuItem'
import { ArtAsset } from '../../types'
import uFuzzy from '@leeoniya/ufuzzy'
import { EditorAssetSearchInput } from './AssetSearchInput'

const fuzzy_search = new uFuzzy() // Create a new fuzzy search instance

interface EditorAssetPaneProps {
  onAssetClick?: (asset: ArtAsset) => void
}

/** Editor pane that handles the display, filtering, and selection of artwork assets. */
export function EditorAssetPane({
  className = '',
  onAssetClick,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & EditorAssetPaneProps) {
  /**
   * Asset Categories
   */
  const [selected_asset_category, setSelectedAssetCategory] = useState<
    string | undefined
  >(undefined)

  const asset_categories = useAssetCategories()
  const category_menu_items = asset_categories.map(category => (
    <PaneMenuItem
      key={category.id}
      label={category.name}
      icon={category.icon}
      isActive={selected_asset_category == category.id}
      onClick={() => setSelectedAssetCategory(category.id)}
    />
  ))

  /**
   * Assets
   */
  const art_assets = useArtAssets() // Inject assets list from assets context
  const filtered_assets: ArtAsset[] = []

  // Filter from text input
  const [search_text, setSearchText] = useState('')
  if (search_text) {
    const asset_names = art_assets.map(asset => asset.name)

    const idxs = fuzzy_search.filter(asset_names, search_text) // Pre-filter
    const info = fuzzy_search.info(idxs, asset_names, search_text) // Collects stats about the filtered matches such as start offsets, fuzz level, etc.
    const order = fuzzy_search.sort(info, asset_names, search_text) // Orders the matches based on the collected stats

    for (const order_index of order) {
      filtered_assets.push(art_assets[info.idx[order_index]])
    }
  } else {
    filtered_assets.push(...art_assets)
  }

  const art_asset_menu_items = filtered_assets.reduce<React.ReactNode[]>(
    (items, asset) => {
      // If we have a category selected and this asset doesn't have that category assigned to it, then skip
      if (
        selected_asset_category != undefined &&
        !asset.category_ids.includes(selected_asset_category)
      ) {
        return items
      }

      items.push(
        <EditorArtAssetMenuItem
          key={asset.id}
          asset={asset}
          onClick={() => (onAssetClick ? onAssetClick(asset) : undefined)}
        />
      )
      return items
    },
    []
  )

  return (
    <div className={className + ' flex flex-col'} {...props}>
      {/* Search box */}
      <div className="p-1/2 bg-neutral-775">
        <EditorAssetSearchInput
          className="w-full"
          onInput={e => setSearchText((e.target as HTMLInputElement).value)}
        />
      </div>

      <div className="flex-1 flex">
        {/* Category filter menu */}
        <div
          className="flex flex-col bg-neutral-875"
          data-testid="asset-pane-category-list"
        >
          <PaneMenuItem
            label="All"
            icon="asset-category-all"
            isActive={selected_asset_category == undefined}
            onClick={() => setSelectedAssetCategory(undefined)}
          />
          {category_menu_items}
        </div>

        {/* Art Asset list */}
        <div
          className="flex-1 grid grid-cols-3 p-1/2 gap-1/2 items-start overflow-y-auto"
          data-testid="asset-pane-main-list"
        >
          {art_asset_menu_items}
        </div>
      </div>
    </div>
  )
}
