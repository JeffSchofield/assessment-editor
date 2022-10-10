import React from 'react'
import { render, screen, userEvent } from '../../utils'
import { describe, expect, it, vi } from 'vitest'
import { ArtAssetsContext } from '../../../src/contexts/assets'
import { art_assets } from '../../fixtures/constants'
import { EditorAssetPane } from '../../../src/components/editor/AssetPane'

describe('Editor Asset Pane Component', () => {
  it('should display all assets by default', () => {
    render(
      <ArtAssetsContext.Provider value={art_assets}>
        <EditorAssetPane />
      </ArtAssetsContext.Provider>
    )

    const main_list = screen.getByTestId('asset-pane-main-list')

    expect(main_list.children).toHaveLength(art_assets.length) // Make sure the same number of assets are rendered
  })

  it('should call `onAssetClick` when an asset is clicked', async () => {
    const event_handlers = {
      handleAssetClick() {
        return undefined
      }
    }

    const asset_click_spy = vi.spyOn(event_handlers, 'handleAssetClick') // Create a spy to watch when the asset click handler is called

    render(
      <ArtAssetsContext.Provider value={art_assets}>
        <EditorAssetPane onAssetClick={event_handlers.handleAssetClick} />
      </ArtAssetsContext.Provider>
    )

    const main_list = screen.getByTestId('asset-pane-main-list')

    await userEvent.click(main_list.children[0]) // Click the first asset in the main list

    expect(asset_click_spy).toHaveBeenCalledTimes(1) // Check the spy to see if the handler was called once
    expect(asset_click_spy).toHaveBeenCalledWith(art_assets[0]) // Check to see if the handler was called with the first asset as a value
  })
})
