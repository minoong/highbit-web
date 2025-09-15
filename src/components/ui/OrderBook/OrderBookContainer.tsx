'use client'

import { shallowEqual } from 'react-redux'

import OrderBook from '~/components/ui/OrderBook/OrderBook'
import { selectedMarketObjectSelector } from '~/features/marketInfo/marketInfoSlice'
import { useAppSelector } from '~/hooks'

import useUpbitData from '~/hooks/useUpbitData'

function OrderBookContainer() {
 const selectedMarket = useAppSelector(selectedMarketObjectSelector, shallowEqual)

 const ticker = useAppSelector((state) =>
  state.tickers.tickers.find((ticker) => ticker.market === selectedMarket[0].market),
 )

 const { socketData } = useUpbitData(selectedMarket, 'orderbook')

 return (
  <div className="w-[490px]">
   {socketData.length > 0 && ticker ? (
    <OrderBook data={socketData[0]} />
   ) : (
    <div className="h-[700px] w-[490px] animate-pulse">
     <div className="h-full w-full rounded-sm bg-slate-700"></div>
    </div>
   )}
  </div>
 )
}

export default OrderBookContainer
