import { ArtAssetStageObject, StageObject, StageObjectType } from './types'

/** Checks whether a stage object is specifically an art asset stage object. */
export function isArtAssetStageObject(
  object: StageObject
): object is ArtAssetStageObject {
  return object.type == StageObjectType.ART_ASSET
}

/**
 * Downloads a URI automatically.
 *
 * Credit: https://stackoverflow.com/questions/3916191/download-data-url-file/15832662
 */
export function downloadURI(uri: string, filename: string) {
  // Create an anchor element setup to download the URI
  const link = document.createElement('a')
  link.download = filename
  link.href = uri

  // Add anchor to body, click it to trigger download, then remove
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
