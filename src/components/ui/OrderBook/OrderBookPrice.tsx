import React from 'react'
import { useOrderBookContext } from '~/components/ui/OrderBook/OrderBookContext'
import { MarketUtils } from '~/utils/marketUtils'

const getChangeRate = (currentValue: number, prevClose: number) => {
 const result = ((currentValue - prevClose) / prevClose) * 100
 return +result
}

interface Props {
 price: number
 prev_closing_price: number
}

function OrderBookPrice(props: Props) {
 const { price, prev_closing_price } = props
 const { askBid } = useOrderBookContext()

 const color = askBid === 'ASK' ? 'text-trade-rise' : 'text-trade-fall'
 const chnage =
  price === prev_closing_price ? 'text-gray-900' : price > prev_closing_price ? 'text-trade-rise' : 'text-trade-fall'

 return (
  <>
   {askBid === 'BID' ? (
    <th colSpan={2} className="bg-white">
     &nbsp;
    </th>
   ) : null}
   <th className={`border border-white ${color}`}>
    <div className={`flex w-full ${chnage}`}>
     <div className="flex-1">{MarketUtils.getPricePretty(price)}</div>
     <div className="pr-2">
      {getChangeRate(price, prev_closing_price) > 0 && '+'}
      {getChangeRate(price, prev_closing_price).toFixed(2)}%
     </div>
    </div>
   </th>
   {askBid === 'ASK' ? (
    <th colSpan={2} className="bg-white">
     &nbsp;
    </th>
   ) : null}
  </>
 )
}

export default React.memo(OrderBookPrice)
