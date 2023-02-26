'use client'

import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import TickerBox from '~/components/ui/Ticker/TickerBox'
import TickerSearch from '~/components/ui/Ticker/TickerSearch'
import VirtualScroll from '~/components/VirtualScroll/VirtualScroll'
import { marketsInvoke } from '~/features/markets/marketsSlice'
import { tickerSelector, tickersInvoke, tickersUpdate } from '~/features/tickers/tickersSlice'
import { useAppDispatch, useAppSelector } from '~/hooks'
import useMarketsQuery from '~/hooks/queries/useMarketsQuery'
import useTickersQuery from '~/hooks/queries/useTickersQuery'
import useUpbit from '~/hooks/useUpbit.websocket'

const Blocked = styled.div``

function TestButton() {
 const dispatch = useAppDispatch()

 const [y, setY] = useState<number>(0)
 const markets = useAppSelector((state) => state.markets.markets)
 const tickers = useAppSelector(tickerSelector)

 useMarketsQuery({
  suspense: true,
  onSuccess: (data) => {
   dispatch(marketsInvoke(data))
  },
  staleTime: Infinity,
 })

 useTickersQuery({
  suspense: true,
  enabled: markets.length > 0,
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
   <div>
    <div className="virtualscroll sticky top-20 h-[993px]" onScroll={(e) => setY(e.currentTarget.scrollTop)}>
     <TickerSearch />
     <VirtualScroll height={993} itemHeight={46} offsetY={y}>
      {tickers
       .filter((v) => v.market.startsWith('KRW-'))
       .sort((a, b) => b.signed_change_rate - a.signed_change_rate)
       .map((ticker) => (
        <TickerBox
         key={ticker.market}
         {...ticker}
         market={markets.find((v) => v.market === ticker.market)?.market || ''}
         korean_name={markets.find((v) => v.market === ticker.market)?.korean_name || ''}
        />
       ))}
     </VirtualScroll>
    </div>
   </div>
  </Blocked>
 )
}

export default TestButton
