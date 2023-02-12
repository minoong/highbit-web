import type { ComponentProps, PropsWithChildren } from 'react'

type Props = PropsWithChildren<ComponentProps<'td'>>

export function TableCell(props: Props) {
 const { children, className = '', ...rest } = props

 return (
  <td className={`whitespace-nowrap px-6 py-4 font-medium text-gray-900 ${className}`} {...rest}>
   {children}
  </td>
 )
}
