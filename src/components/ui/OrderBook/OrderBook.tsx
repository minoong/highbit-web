'use client'

import type { Orderbook } from '~/types/apis/orderbook.socket'
import { useAppSelector } from '~/hooks'
import { MarketUtils } from '~/utils/marketUtils'

const getChangeRate = (currentValue: number, prevClose: number) => {
 const result = ((currentValue - prevClose) / prevClose) * 100
 return +result
}

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
        <tr key={`ask_${ele.ask_price}`} className="h-[45px] bg-[#EEF2FB] hover:bg-[#D2DFF3]">
         <th className="border border-y-white border-r-white">&nbsp;</th>
         <th className="border border-white font-normal text-trade-even">
          <div className="relative h-full w-full text-right">
           <div className="p-1">{(+ele.ask_size.toFixed(3)).toLocaleString()}</div>
           <div
            className="absolute inset-y-0 right-0"
            style={{ width, backgroundColor: 'rgba(18,97,196,.14901960784313725)' }}
           />
          </div>
         </th>
         <th className="border border-white text-trade-rise">
          <div className="flex w-full">
           <div className="flex-1">{MarketUtils.getPricePretty(ele.ask_price)}</div>
           <div className="pr-2">
            {getChangeRate(ele.ask_price, ticker.prev_closing_price) > 0 && '+'}
            {getChangeRate(ele.ask_price, ticker.prev_closing_price).toFixed(2)}%
           </div>
          </div>
         </th>
         <th colSpan={2} className="bg-white">
          &nbsp;
         </th>
        </tr>
       )
      })}
     {ticker !== undefined &&
      data.orderbook_units &&
      [...data.orderbook_units].map((ele) => {
       const width = `${(ele.bid_size / maxSize) * 100}%`
       return (
        <tr key={`bid_${ele.bid_price}`} className="h-[45px] bg-[#FCF0F0] hover:bg-[#F5DCD6]">
         <th colSpan={2} className="bg-white">
          &nbsp;
         </th>
         <th className="border border-white text-trade-fall">
          <div className="flex w-full">
           <div className="flex-1">{MarketUtils.getPricePretty(ele.bid_price)}</div>
           <div className="pr-2">
            {getChangeRate(ele.ask_price, ticker.prev_closing_price) > 0 && '+'}
            {getChangeRate(ele.ask_price, ticker.prev_closing_price).toFixed(2)}%
           </div>
          </div>
         </th>

         <th className="border border-white font-normal text-trade-even">
          <div className="relative h-full w-full text-left">
           <div className="p-1">{(+ele.bid_size.toFixed(3)).toLocaleString()}</div>
           <div
            className="absolute inset-y-0 left-0"
            style={{ width, backgroundColor: 'rgba(200,74,49,.14901960784313725)' }}
           />
          </div>
         </th>

         <th className="border border-white">&nbsp;</th>
        </tr>
       )
      })}
    </tbody>
   </table>
  </div>
 )
}

export default OrderBook
