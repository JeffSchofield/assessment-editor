import React from 'react'
import { Path } from 'react-konva'
import { INode } from 'svgson'
import { LineCap, LineJoin } from 'konva/lib/Shape'

/** Convert SVGSON AST to Konva Path components */
export function svgsonToKonvaPaths(svgson: INode) {
  return svgson.children.reduce<React.ReactNode[]>((paths, child, i) => {
    if (child.name == 'path') {
      const {
        d,
        opacity,
        fill,
        stroke,
        'stroke-width': strokeWidth,
        'line-join': lineJoin,
        'line-cap': lineCap
      } = child.attributes

      paths.push(
        <Path
          key={i}
          data={d}
          opacity={opacity ? parseFloat(opacity) : 1}
          fill={fill == 'none' ? undefined : fill}
          stroke={stroke == 'none' ? undefined : stroke}
          strokeWidth={strokeWidth ? parseFloat(strokeWidth) : 0}
          lineJoin={lineJoin as LineJoin}
          lineCap={lineCap as LineCap}
        />
      )
    }
    return paths
  }, [])
}
