import { INode } from 'svgson'

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
