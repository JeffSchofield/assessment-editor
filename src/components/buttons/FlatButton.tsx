import React from 'react'

interface FlatButtonProps {
  children?: React.ReactNode
}

/**
 * A plain flat button with rounded corners
 */
export function FlatButton({
  className,
  children,
  ...props
}: FlatButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      role="button"
      className={
        className +
        ' px-1 py-1/2 leading-3/4 rounded-1/3 transition-color duration-100 bg-primary-500 can-hover:hover:bg-primary-450 active:!bg-primary-300 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-1/8'
      }
      {...props}
    >
      {children}
    </button>
  )
}
