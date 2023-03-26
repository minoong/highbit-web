import type { OrderBookType } from '~/components/ui/OrderBook/OrderBookContext'
import type { ComponentProps, PropsWithChildren } from 'react'
import React from 'react'
import { OrderBookContext } from '~/components/ui/OrderBook/OrderBookContext'

type Props = PropsWithChildren<ComponentProps<'tr'> & OrderBookType>

function OrderBookRow(props: Props) {
 const { askBid, children } = props

 const className = askBid === 'ASK' ? 'bg-[#EEF2FB] hover:bg-[#D2DFF3]' : 'bg-[#FCF0F0] hover:bg-[#F5DCD6]'

 return (
  <tr className={`h-[45px] ${className}`}>
   <OrderBookContext.Provider value={{ askBid }}>{children}</OrderBookContext.Provider>
  </tr>
 )
}

export default React.memo(OrderBookRow)
