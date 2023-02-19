'use client'

import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { marketsInvoke } from '~/features/markets/marketsSlice'
import { tickersInvoke, tickersUpdate } from '~/features/tickers/tickersSlice'
import { useAppDispatch, useAppSelector } from '~/hooks'
import useMarketsQuery from '~/hooks/queries/useMarketsQuery'
import useTickersQuery from '~/hooks/queries/useTickersQuery'
import useUpbit from '~/hooks/useUpbit.websocket'

const Blocked = styled.div`
 color: red;
`

function TestButton() {
 const dispatch = useAppDispatch()

 const [count, setCount] = useState(0)
 const markets = useAppSelector((state) => state.markets.markets)
 const tickers = useAppSelector((state) => state.tickers.tickers)

 useMarketsQuery({
  suspense: true,
  onSuccess: (data) => {
   dispatch(marketsInvoke(data))
  },
  staleTime: Infinity,
 })

 useTickersQuery({
  suspense: true,
  onSuccess: (data) => {
   dispatch(tickersInvoke(data))
  },
 })

 const { socketData } = useUpbit(markets, 'ticker')

 useEffect(() => {
  dispatch(tickersUpdate(socketData))
 }, [dispatch, socketData])

 return (
  <Blocked>
   TestButton #{count}
   <div>
    <button type="button" onClick={() => setCount((prev) => prev + 1)}>
     +1
    </button>
    <button type="button" onClick={() => setCount((prev) => prev - 1)}>
     -1
    </button>
    <p>#{tickers.filter((v) => v.market.startsWith('KRW-')).length}</p>
    {tickers
     .filter((v) => v.market.startsWith('KRW-'))
     .sort((a, b) => b.signed_change_rate - a.signed_change_rate)
     .map((ticker) => (
      <div key={ticker.market}>
       {ticker.market} | {ticker.trade_price}
      </div>
     ))}
   </div>
  </Blocked>
 )
}

export default TestButton
