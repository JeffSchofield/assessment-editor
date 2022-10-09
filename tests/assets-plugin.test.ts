import { describe, expect, it } from 'vitest'
import { assetsPlugin } from '../src/lib/assets-plugin'

type AssetsPlugin = {
  name: string
  configResolved: () => void | Promise<() => void>
  resolveId: (id: string) => string
  load: (id: string) => string
}

describe('Assets Vite Plugin', () => {
  const virtual_module = 'virtual:art_assets'
  it('should load all assets successfully and export them as a virtual module', async () => {
    // Expect to find a single art asset compiled from the files found in `./fixtures/artwork`
    const expected_export_structure = `[{"id":"82134889-ac55-4eea-8f6a-618699fbbb6b","name":"Some Asset","src":"/tests/fixtures/artwork/some-asset.svg","content":{"name":"svg","type":"element","value":"","attributes":{"height":"50","width":"50","xmlns":"http://www.w3.org/2000/svg"},"children":[]},"category_ids":[]}]`

    const assets_plugin = assetsPlugin({
      artwork_dir: './tests/fixtures/artwork'
    }) as AssetsPlugin

    await assets_plugin.configResolved() // Call the configResolved method of the plugin to perform the scan
    const virtual_module_id = assets_plugin.resolveId(virtual_module) // Get the virtual module ID to load based on the string used to import the virtual module
    const virtual_export = assets_plugin.load(virtual_module_id) // Actually load the contents of the virtual module, which should contain the expected structure above

    expect(virtual_export).toContain(expected_export_structure)
  })

  it('should find no assets when SVGs do not have corresponding JSON manifests', async () => {
    // Expect an empty array
    const expected_export_structure = `[]`

    const assets_plugin = assetsPlugin({
      artwork_dir: './tests/fixtures/artwork-no-json'
    }) as AssetsPlugin

    await assets_plugin.configResolved()
    const virtual_module_id = assets_plugin.resolveId(virtual_module)
    const virtual_export = assets_plugin.load(virtual_module_id)

    expect(virtual_export).toContain(expected_export_structure)
  })
})
