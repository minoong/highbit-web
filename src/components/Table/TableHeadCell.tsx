import type { ComponentProps, PropsWithChildren } from 'react'

type Props = PropsWithChildren<ComponentProps<'th'>>

export function TableHeadCell(props: Props) {
 const { children, className = '', ...rest } = props

 return (
  <th className={`px-6 py-3 ${className}`} {...rest}>
   {children}
  </th>
 )
}
