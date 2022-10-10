import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, fireEvent, screen } from '../../utils'

import { EditorArtAssetMenuItem } from '../../../src/components/editor/ArtAssetMenuItem'
import { art_asset } from '../../fixtures/constants'

describe('Editor Art Asset Menu Item Component', () => {
  it('should display the asset passed via the `asset` prop', () => {
    render(<EditorArtAssetMenuItem asset={art_asset} />)

    expect(
      screen.getByTestId('art-asset-menu-item-image').getAttribute('src')
    ).toEqual(art_asset.src)
  })

  it('should call `onClick` when clicked', () => {
    const event_handlers = {
      handleClick() {
        return undefined
      }
    }

    const spy = vi.spyOn(event_handlers, 'handleClick')

    render(
      <EditorArtAssetMenuItem
        asset={art_asset}
        onClick={event_handlers.handleClick}
        data-testid="click-test"
      />
    )

    fireEvent.click(screen.getByTestId('click-test'))
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
