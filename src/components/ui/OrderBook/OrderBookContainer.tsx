'use client'

import { shallowEqual } from 'react-redux'
import OrderBook from '~/components/ui/OrderBook/OrderBook'
import { selectedMarketObjectSelector } from '~/features/marketInfo/marketInfoSlice'
import { useAppSelector } from '~/hooks'
import useUpbit from '~/hooks/useUpbit.websocket'

function OrderBookContainer() {
 const selectedMarket = useAppSelector(selectedMarketObjectSelector, shallowEqual)
 const ticker = useAppSelector((state) =>
  state.tickers.tickers.find((ticker) => ticker.market === selectedMarket[0].market),
 )

 const { socketData } = useUpbit(selectedMarket, 'orderbook')

 return (
  <div className="w-[490px]">
   {socketData.length > 0 && ticker ? <OrderBook data={socketData[0]} /> : <div>loading...</div>}
  </div>
 )
}

export default OrderBookContainer
