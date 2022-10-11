import { INode } from 'svgson'
import { Vector2d } from 'konva/lib/types'

/** Types that a stage object can be. */
export enum StageObjectType {
  /** An artwork asset object. */
  ART_ASSET
}

/** The basic information used by all stage objects. */
export interface BaseStageObject {
  /** The unique ID of the stage object. */
  id: string

  /** The type of the stage object. */
  type: StageObjectType
}

/** A stage object that has a location and transforms. */
export interface PositionedStageObject extends BaseStageObject {
  /** The x coordinate of the stage object. */
  x: number

  /** The y coordinate of the stage object. */
  y: number

  /** The scale of the stage object. */
  scale: Vector2d

  /** The rotation of the stage object. */
  rotation: number
}

/** An art asset that exists on the stage. */
export interface ArtAssetStageObject extends PositionedStageObject {
  type: StageObjectType.ART_ASSET

  /** The UUID of the art asset that this stage object renders. */
  asset_id: string
}

/** An object that exists on the stage. */
export type StageObject =
  | ArtAssetStageObject
  | PositionedStageObject
  | BaseStageObject

/** The project's current state. */
export interface ProjectState {
  /** Width of the canvas used by this project. */
  width: number

  /** Height of the canvas used by this project. */
  height: number

  /** Contents of the project. */
  stage: StageObject[]
}

/** Category information for an art asset. */
export type ArtAssetCategory = {
  /** The UUID of the art asset category. */
  id: string

  /** The name of the art asset category. */
  name: string

  /** Icon associated with this art asset category. */
  icon: string
}

/** An individual art asset. */
export interface ArtAsset {
  /** The UUID of the art asset. */
  id: string

  /** The name of the art asset. */
  name: string

  /** An array of category UUIDs assigned to the art asset. */
  category_ids: string[]

  /** The source URL of this asset. */
  src: string

  /** The SVG represented as JSON. */
  content: INode
}
