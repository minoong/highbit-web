import type { ComponentProps, PropsWithChildren } from 'react'

import { useTableContext } from '~/components/Table/TableContext'

type Props = PropsWithChildren<ComponentProps<'tr'>>

export function TableRow(props: Props) {
 const { children, className = '', ...rest } = props
 const { striped, hoverable } = useTableContext()

 return (
  <tr
   className={`bg-white odd:bg-white ${hoverable ? 'hover:bg-[#D2DFF3]' : ''} ${
    striped ? 'even:bg-gray-50' : ''
   } ${className}`}
   {...rest}
  >
   {children}
  </tr>
 )
}
