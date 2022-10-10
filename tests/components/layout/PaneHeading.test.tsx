import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '../../utils'

import { PaneHeading } from '../../../src/components/layout/PaneHeading'

describe('Pane Heading Component', () => {
  const heading_test_text = 'Test Content'
  it('should display the text passed in as a child', () => {
    const heading = render(<PaneHeading>{heading_test_text}</PaneHeading>)

    expect(heading.baseElement).toHaveTextContent(heading_test_text)
  })
})
