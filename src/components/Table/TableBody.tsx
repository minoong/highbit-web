import type { ComponentProps, PropsWithChildren } from 'react'

type Props = PropsWithChildren<ComponentProps<'tbody'>>

export function TableBody(props: Props) {
 const { children, className = '', ...rest } = props

 return (
  <tbody className={className} {...rest}>
   {children}
  </tbody>
 )
}
