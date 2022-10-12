import React from 'react'
import { render, screen, userEvent, fireEvent } from '../../utils'
import { describe, expect, it, vi } from 'vitest'
import {
  ArtAssetsContext,
  AssetCategoriesContext
} from '../../../src/contexts/assets'
import { art_assets, art_asset_categories } from '../../fixtures/constants'
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

    await userEvent.click(main_list.children[0].children[0]) // Click the first asset in the main list

    expect(asset_click_spy).toHaveBeenCalledTimes(1) // Check the spy to see if the handler was called once
    expect(asset_click_spy).toHaveBeenCalledWith(art_assets[0]) // Check to see if the handler was called with the first asset as a value
  })

  it('should have a list of categories', () => {
    render(
      <AssetCategoriesContext.Provider value={art_asset_categories}>
        <EditorAssetPane />
      </AssetCategoriesContext.Provider>
    )

    const categories_list = screen.getByTestId('asset-pane-category-list')

    expect(categories_list.children).toHaveLength(
      art_asset_categories.length + 1
    ) // Make sure all categories are rendered plus one for the default 'all' category
  })

  it('should filter assets when a category is clicked', async () => {
    render(
      <ArtAssetsContext.Provider value={art_assets}>
        <AssetCategoriesContext.Provider value={art_asset_categories}>
          <EditorAssetPane />
        </AssetCategoriesContext.Provider>
      </ArtAssetsContext.Provider>
    )

    const categories_list = screen.getByTestId('asset-pane-category-list')
    const main_list = screen.getByTestId('asset-pane-main-list')

    expect(main_list.children.length).toBeGreaterThan(1) // Make sure more than one asset is currently rendered

    await userEvent.click(categories_list.children[1]) // Click the second category in the category list, which is the first custom category after the default "all"

    expect(main_list.children).toHaveLength(1) // There should now only be one asset listed
  })

  it('should filter assets when a search term is entered', async () => {
    render(
      <ArtAssetsContext.Provider value={art_assets}>
        <EditorAssetPane />
      </ArtAssetsContext.Provider>
    )

    const asset_search_input = screen.getByRole('textbox') // Get the search input
    const main_list = screen.getByTestId('asset-pane-main-list')

    expect(main_list.children.length).toBeGreaterThan(1) // Make sure more than one asset is currently rendered

    await userEvent.type(asset_search_input, 'Second') // Type the string `Second` in order to include only the asset with `Second` in its name

    expect(main_list.children).toHaveLength(1) // There should now only be one asset listed
  })

  it('should show a ghost image of the asset when an asset menu item is dragged', () => {
    render(
      <ArtAssetsContext.Provider value={art_assets}>
        <EditorAssetPane />
      </ArtAssetsContext.Provider>
    )

    const main_list = screen.getByTestId('asset-pane-main-list')
    const drag_element = main_list.children[0].children[0]

    fireEvent.dragStart(drag_element, {
      dataTransfer: { setDragImage: () => undefined, setData: () => undefined }
    }) // Start a drag, mock the dataTransfer object to avoid errors

    let ghost = screen.queryByTestId('asset-ghost') // Look for the ghost
    expect(ghost).toBeTruthy() // Ghost should exist

    fireEvent.dragEnd(drag_element) // End the drag

    ghost = screen.queryByTestId('asset-ghost') // Look again for the ghost
    expect(screen.queryByTestId('asset-ghost')).toBeNull() // Should be null because the ghost is removed
  })
})
