import type { ComponentProps, PropsWithChildren } from 'react'
import { useTableContext } from '~/components/Table/TableContext'

type Props = PropsWithChildren<ComponentProps<'tr'>>

export function TableRow(props: Props) {
 const { children, className = '', ...rest } = props
 const { striped, hoverable } = useTableContext()

 return (
  <tr
   className={`bg-white odd:bg-white even:bg-gray-50 ${hoverable ? 'hover:bg-[#D2DFF3]' : ''} ${
    striped ? 'odd:bg-[##F9FAFB]' : ''
   } ${className}`}
   {...rest}
  >
   {children}
  </tr>
 )
}
