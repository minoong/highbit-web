import React from 'react'

import { useOrderBookContext } from '~/components/ui/OrderBook/OrderBookContext'

interface Props {
 percetage: string
 size: number
}

function OrderBookLoom(props: Props) {
 const { percetage, size } = props
 const { askBid } = useOrderBookContext()

 const backgroundColor = askBid === 'ASK' ? 'rgba(18,97,196,.14901960784313725)' : 'rgba(200,74,49,.14901960784313725)'
 const textAlign = askBid === 'ASK' ? 'text-right' : 'text-left'
 const align = askBid === 'ASK' ? 'right-0' : 'left-0'

 return (
  <>
   {askBid === 'ASK' ? <th className="border border-y-white border-r-white">&nbsp;</th> : null}
   <th className="border border-white font-normal text-trade-even">
    <div className={`relative h-full w-full text-right ${textAlign}`}>
     <div className="p-1">{(+size.toFixed(3)).toLocaleString()}</div>
     <div className={`absolute inset-y-0 ${align}`} style={{ width: percetage, backgroundColor }} />
    </div>
   </th>
   {askBid === 'BID' ? <th className="border border-white">&nbsp;</th> : null}
  </>
 )
}

export default React.memo(OrderBookLoom)
