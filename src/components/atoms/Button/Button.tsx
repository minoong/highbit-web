import type { ForwardedRef, HTMLAttributes, MouseEvent } from 'react'
import { forwardRef } from 'react'
import React from 'react'

const Theme: Record<'text' | 'contained' | 'outlined', Record<string, HTMLAttributes<HTMLDivElement>['className']>> = {
 text: {
  bgColorType: 'bg-transparent text-[#0062DF] border border-transparent',
  disabled: 'bg-transparent text-[#A6A6A6] border border-transparent',
 },
 contained: {
  bgColorType: 'bg-[#0062DF] text-white border border-[#0062DF]',
  disabled: 'bg-[#E0E0E0] text-[#A6A6A6] border border-[#E0E0E0]',
 },
 outlined: {
  bgColorType: 'bg-transparent text-[#0062DF] border border-[#0062DF]',
  disabled: 'bg-transparent text-[#A6A6A6] border border-[#E0E0E0]',
 },
} as const

interface Props extends HTMLAttributes<HTMLButtonElement> {
 variant?: 'text' | 'contained' | 'outlined'
 rounded?: 'full' | 'sm' | 'md' | 'lg' | string
 full?: boolean
 alignment?: 'start' | 'center' | 'end'
 disabled?: boolean
 onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
 children: React.ReactNode
}

function Button(props: Props, ref: ForwardedRef<HTMLButtonElement>) {
 const {
  variant = 'contained',
  rounded = '',
  full = false,
  alignment = 'center',
  disabled = false,
  onClick,
  children,

  ...rest
 } = props

 const roundedCls = rounded ? `rounded-${rounded}` : ''
 const alignmentCls = `justify-${alignment}`
 return (
  <button
   ref={ref}
   onClick={onClick}
   className={`${Theme[variant].bgColorType} ${
    disabled ? Theme[variant].disabled + ' cursor-not-allowed' : ''
   } px-2 py-1 ${roundedCls} transition hover:brightness-110 ${full ? 'w-full' : ''} flex ${alignmentCls} font-normal`}
   disabled={disabled}
   {...rest}
  >
   {children}
  </button>
 )
}

export default forwardRef<HTMLButtonElement, Props>(Button)
