import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '../../utils'

import { SvgIcon } from '../../../src/components/media/SvgIcon'

describe('SVG Icon Component', () => {
  const icon_test_name = 'test'

  it('should use the specified icon name with the default prefix', () => {
    const svg_icon = render(<SvgIcon name={icon_test_name} />)

    const svg_use = svg_icon.getByTestId('use')

    expect(svg_use.getAttribute('href')).toEqual(`#icon-${icon_test_name}`)
  })

  it('should use a custom prefix', () => {
    const icon_test_prefix = 'test_prefix'
    const svg_icon = render(
      <SvgIcon name={icon_test_name} prefix={icon_test_prefix} />
    )

    const svg_use = svg_icon.getByTestId('use')

    expect(svg_use.getAttribute('href')).toEqual(
      `#${icon_test_prefix}-${icon_test_name}`
    )
  })
})
