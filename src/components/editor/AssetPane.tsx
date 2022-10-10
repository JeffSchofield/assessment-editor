import React, { useState } from 'react'
import { useArtAssets } from '../../contexts/assets'
import { EditorArtAssetMenuItem } from './ArtAssetMenuItem'
import { ArtAsset } from '../../types'

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
   * Assets
   */
  const art_assets = useArtAssets() // Inject assets list from assets context

  const art_asset_menu_items = art_assets.map(asset => (
    <EditorArtAssetMenuItem
      key={asset.id}
      asset={asset}
      onClick={() => onAssetClick(asset)}
    />
  ))

  return (
    <div className={className + ' flex flex-col'} {...props}>
      <div className="flex-1 flex">
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
