import { describe, expect, it } from 'vitest'
import { renderHook } from '../utils'
import { useArtAssets, useAssetCategories } from '../../src/contexts/assets'

describe('Assets Contexts', () => {
  describe('Art Assets Context', () => {
    it('should provide an array of art assets', () => {
      const { result } = renderHook(() => useArtAssets())

      expect(Array.isArray(result.current)).toBeTruthy() // Make sure the hook returns an array
      expect(result.current.length).toBeGreaterThan(0) // Make sure there is something in the array
      expect(Object.keys(result.current[0])).toEqual(
        expect.arrayContaining(['id', 'name', 'src', 'content', 'category_ids']) // Make sure the array contains an art asset object
      )
    })
  })

  describe('Asset Categories Context', () => {
    it('should provide a list of categories', () => {
      const { result } = renderHook(() => useAssetCategories())

      expect(Array.isArray(result.current)).toBeTruthy() // Make sure the hook returns an array
      expect(result.current.length).toBeGreaterThan(0) // Make sure there is something in the array
      expect(Object.keys(result.current[0])).toEqual(
        expect.arrayContaining(['id', 'name', 'icon']) // Make sure the array contains an asset category object
      )
    })
  })
})
