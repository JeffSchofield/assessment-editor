import { ArtAssetStageObject, StageObject, StageObjectType } from './types'

/** Checks whether a stage object is specifically an art asset stage object. */
export function isArtAssetStageObject(
  object: StageObject
): object is ArtAssetStageObject {
  return object.type == StageObjectType.ART_ASSET
}
