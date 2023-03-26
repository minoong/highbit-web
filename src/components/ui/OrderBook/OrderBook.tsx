'use client'

import type { Orderbook } from '~/types/apis/orderbook.socket'
import OrderBookLoom from '~/components/ui/OrderBook/OrderBookLoom'
import OrderBookPrice from '~/components/ui/OrderBook/OrderBookPrice'
import OrderBookRow from '~/components/ui/OrderBook/OrderBookRow'
import { useAppSelector } from '~/hooks'

interface Props {
 data: Orderbook
}

function OrderBook(props: Props) {
 const { data } = props
 const tickers = useAppSelector((state) => state.tickers.tickers)

 if (!data) return <div>Loading...</div>

 const maxSize = Math.max(
  ...data.orderbook_units.map((v) => v.ask_size),
  ...data.orderbook_units.map((v) => v.bid_size),
 )

 const ticker = tickers.find((ticker) => ticker.market === data.code)

 return (
  <div className="virtualscroll h-[700px]">
   <table className="w-[490px]">
    <colgroup>
     <col width="42" />
     <col width="120" />
     <col width="*" />
     <col width="120" />
     <col width="42" />
    </colgroup>
    <tbody className="text-[12px]">
     {ticker !== undefined &&
      data.orderbook_units &&
      [...data.orderbook_units].reverse().map((ele) => {
       const width = `${(ele.ask_size / maxSize) * 100}%`
       return (
        <OrderBookRow key={`ask_${ele.ask_price}`} askBid="ASK">
         <OrderBookLoom percetage={width} size={ele.ask_size} />
         <OrderBookPrice price={ele.ask_price} prev_closing_price={ticker.prev_closing_price} />
        </OrderBookRow>
       )
      })}
     {ticker !== undefined &&
      data.orderbook_units &&
      [...data.orderbook_units].map((ele) => {
       const width = `${(ele.bid_size / maxSize) * 100}%`
       return (
        <OrderBookRow key={`bid_${ele.bid_price}`} askBid="BID">
         <OrderBookPrice price={ele.bid_price} prev_closing_price={ticker.prev_closing_price} />
         <OrderBookLoom percetage={width} size={ele.bid_size} />
        </OrderBookRow>
       )
      })}
    </tbody>
   </table>
  </div>
 )
}

export default OrderBook
