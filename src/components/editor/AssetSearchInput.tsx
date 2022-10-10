import React from 'react'
import { TextInput } from '../inputs/TextInput'

/** Search input filter for art assets */
export function EditorAssetSearchInput({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <TextInput leftIcon="search" {...props} />
}
