import React, { DragEvent as ReactDragEvent, useState } from 'react'
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
          draggable="true"
          onDragStart={e => handleDragStart(e, asset)}
        />
      )
      return items
    },
    []
  )

  // Create the drag event handler
  function handleDragStart(e: ReactDragEvent, asset: ArtAsset) {
    // Create a ghost image of the asset
    const ghost = document.createElement('img')
    ghost.dataset.testid = 'asset-ghost'
    ghost.src = asset.src

    // Position the ghost absolutely, center the ghost under the element origin, and make sure there are no pointer events so it doesn't interfere with drag events
    ghost.classList.add(
      'absolute',
      'pointer-events-none',
      '-translate-x-50%',
      '-translate-y-50%'
    )

    // Position the ghost on the cursor
    ghost.style.left = e.pageX + 'px'
    ghost.style.top = e.pageY + 'px'

    // Add the ghost to the body for display
    document.body.appendChild(ghost)

    // Update the ghost position as the mouse moves
    function handleDragMove(e: DragEvent) {
      ghost.style.left = e.pageX + 'px'
      ghost.style.top = e.pageY + 'px'
    }

    // Remove the ghost and clear event listeners when the dragging stops
    function handleDragEnd() {
      e.target.removeEventListener('dragend', handleDragEnd)
      document.removeEventListener('dragover', handleDragMove)
      document.body.removeChild(ghost)
    }

    // Register drag event listeners
    document.addEventListener('dragover', handleDragMove)
    e.target.addEventListener('dragend', handleDragEnd)

    // Hide the browser's built in drag image by setting it to an empty SVG URI
    const drag_image = new Image()
    drag_image.src = 'data:image/svg+xml;utf8,<svg></svg>'
    e.dataTransfer.setDragImage(drag_image, 0, 0)

    // Store the asset data using the drag events data transfer
    e.dataTransfer.setData(
      'text/plain',
      `${asset.id}:${ghost.width}:${ghost.height}` // Serialize the asset data as ASSET_ID:WIDTH:HEIGHT
    )
  }

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
