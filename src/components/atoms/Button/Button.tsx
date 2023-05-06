import type { ForwardedRef, HTMLAttributes, MouseEvent } from 'react'
import classNames from 'classnames'
import { forwardRef } from 'react'
import React from 'react'

const Theme: Record<'text' | 'contained' | 'outlined', Record<string, HTMLAttributes<HTMLDivElement>['className']>> = {
 text: {
  bgColorType: 'bg-transparent border',
  disabled: 'bg-transparent text-[#A6A6A6] border border-transparent',
 },
 contained: {
  bgColorType: 'text-white border',
  disabled: 'bg-[#E0E0E0] text-[#A6A6A6] border border-[#E0E0E0]',
 },
 outlined: {
  bgColorType: 'bg-transparent border',
  disabled: 'bg-transparent text-[#A6A6A6] border border-[#E0E0E0]',
 },
} as const

interface Props extends HTMLAttributes<HTMLButtonElement> {
 color?: 'primary' | 'secondary' | 'tertiary' | 'quinary'
 variant?: 'text' | 'contained' | 'outlined'
 rounded?: 'full' | 'sm' | 'md' | 'lg' | string
 full?: boolean
 alignment?: 'start' | 'center' | 'end'
 disabled?: boolean
 className?: string
 type?: 'button' | 'submit' | 'reset'
 onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
 children: React.ReactNode
}

function Button(props: Props, ref: ForwardedRef<HTMLButtonElement>) {
 const {
  color = 'primary',
  variant = 'contained',
  rounded = '',
  full = false,
  alignment = 'center',
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  children,
  ...rest
 } = props

 const cls = classNames(
  !disabled && color && variant === 'text' && `text-trade-btn-${color} border-transparent`,
  !disabled && color && variant === 'contained' && `bg-trade-btn-${color} border-trade-btn-${color}`,
  !disabled && color && variant === 'outlined' && `text-trade-btn-${color} border-trade-btn-${color}`,
  !disabled ? 'hover:brightness-110' : 'hover:brightness-90',
  disabled && Theme[variant].disabled,
  disabled && 'cursor-not-allowed [&>*]:cursor-not-allowed',
  rounded && `rounded-${rounded}`,
  full && 'w-full',
  `justify-${alignment}`,
  className,
 )

 return (
  <button
   ref={ref}
   onClick={onClick}
   className={`flex transition ${Theme[variant].bgColorType} ${cls}`}
   disabled={disabled}
   {...rest}
   type={type}
  >
   {children}
  </button>
 )
}

export default forwardRef<HTMLButtonElement, Props>(Button)
