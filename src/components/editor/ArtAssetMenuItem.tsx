import React from 'react'
import { ArtAsset } from '../../types'

interface EditorAssetMenuItemProps {
  asset: ArtAsset
}

/** An */
export function EditorArtAssetMenuItem({
  asset,
  className,
  ...props
}: EditorAssetMenuItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        className +
        ' p-1/2 rounded-1/4 transition-color duration-100 bg-neutral-600 can-hover:hover:bg-neutral-500 active:!bg-neutral-400 active:ring-1/8 focus-visible:bg-neutral-500 focus-visible:ring-1/8 focus-visible:outline-0'
      }
    >
      <img
        src={asset.src}
        alt={`Artwork Asset ${asset.name}`}
        draggable="false"
        className=""
        data-testid="art-asset-menu-item-image"
      />
    </button>
  )
}
