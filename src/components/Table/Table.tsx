import type { TableContextType } from '~/components/Table/TableContext'

import type { ComponentProps, PropsWithChildren } from 'react'

import { TableContext } from '~/components/Table/TableContext'

type Props = PropsWithChildren<ComponentProps<'table'> & TableContextType> & {
 width?: string
}

export function TableComponent(props: Props) {
 const { width = 'w-full', children, striped, hoverable, className = '', ...rest } = props

 return (
  <div className={`relative overflow-x-auto ${width}`}>
   <TableContext.Provider value={{ striped, hoverable }}>
    <table className={`w-full ${className}`} {...rest}>
     {children}
    </table>
   </TableContext.Provider>
  </div>
 )
}
