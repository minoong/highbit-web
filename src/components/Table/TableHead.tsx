import type { ComponentProps, PropsWithChildren } from 'react'

type Props = PropsWithChildren<ComponentProps<'thead'>>

export function TableHead(props: Props) {
 const { children, className, ...rest } = props

 return (
  <thead {...rest} className={`bg-gray-50 text-xs uppercase text-gray-700 ${className}`}>
   <tr>{children}</tr>
  </thead>
 )
}
