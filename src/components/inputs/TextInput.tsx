import React from 'react'
import { SvgIcon } from '../media/SvgIcon'

interface TextInputProps {
  /** Name of the icon to show on the left hand side */
  leftIcon?: string

  /** Name of the icon to show on the right hand side */
  rightIcon?: string
}

/** Basic text input component. */
export function TextInput({
  leftIcon,
  rightIcon,
  className,
  ...props
}: TextInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={
        className +
        ' group flex items-center px-1/2 py-1/4 rounded-1/4 text-white border border-neutral-650 bg-neutral-850 initial:w-full focus-within:z-10 focus-within:outline-none focus-within:ring-1/8 focus-within:ring-blue-500 focus-within:!border-blue-400'
      }
    >
      {leftIcon != undefined && (
        <div className="flex items-center">
          <SvgIcon
            name={leftIcon}
            className="fill-current mr-1/4 h-[1.5em] -m-1/4"
            data-testid="text-left-icon"
          />
        </div>
      )}
      <div className="flex-1">
        <input
          type="text"
          size={0}
          className="border-0 p-0 bg-transparent focus:ring-0 focus:outline-none w-full placeholder:text-neutral-450"
          {...props}
        />
      </div>
      {rightIcon != undefined && (
        <div className="flex items-center">
          <SvgIcon
            name={rightIcon}
            className="fill-current ml-1/4 h-[1.5em] -m-1/4"
            data-testid="text-right-icon"
          />
        </div>
      )}
    </div>
  )
}
