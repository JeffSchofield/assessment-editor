import type { Plugin } from 'vite'
import Path from 'path'
import { sync as globSync } from 'fast-glob'
import { readFile } from 'fs/promises'
import { parse as parseSVG } from 'svgson'
import { ArtAsset } from '../src/types'

interface AssetsPluginOptions {
  /** Directory to look for artwork assets in */
  artwork_dir?: string
}

/** Plugin to compile all SVGs and JSON manifests found in the `assets/artwork` folder */
export function assetsPlugin({
  artwork_dir = './src/assets/artwork'
}: AssetsPluginOptions = {}): Plugin {
  // Artwork Assets
  const art_assets_virtual_import = `virtual:art_assets`
  const resolved_art_assets_virtual_import = '\0' + art_assets_virtual_import

  const art_assets: ArtAsset[] = [] // Stores the final collection of art assets

  return {
    name: 'AssetsPlugin',
    async configResolved() {
      // Get list of artwork SVGs from the artwork assets folder
      const art_asset_files = globSync(`${artwork_dir}/**/*.svg`, {
        onlyFiles: true
      })

      // Process each art asset
      for (const asset_file of art_asset_files) {
        try {
          const { name: filename, dir } = Path.parse(asset_file)

          // Load asset metadata
          const asset_metadata_content = await readFile(
            Path.join(dir, `${filename}.json`),
            'utf-8'
          )

          const { id, name, category_ids } = JSON.parse(
            asset_metadata_content.trim()
          ) // Extract supported metadata keys

          const asset_svg_content = await readFile(asset_file, 'utf-8') // Get the contents of the SVG asset file
          const asset_json_content = await parseSVG(asset_svg_content) // Convert SVG contents to JSON

          // Add the art asset
          art_assets.push({
            id,
            name,
            src: asset_file.substring(1), // Swallow the initial `.` in the path, e.g. `./src` -> `/src`
            content: asset_json_content,
            category_ids
          })
        } catch (e) {
          console.warn(`Unable to add artwork asset '${asset_file}'.`) // Still print the error to warn the developer
        }
      }
    },
    resolveId(id) {
      if (id == art_assets_virtual_import) {
        return resolved_art_assets_virtual_import
      }
    },
    load(id) {
      if (id == resolved_art_assets_virtual_import) {
        return `export const art_assets = ${JSON.stringify(art_assets)}` // Virtual module exports the art assets collection
      }
    }
  }
}
