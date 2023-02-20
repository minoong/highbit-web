'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Star from '~/assets/svgs/star_fill.svg'
import TickerBox from '~/components/ui/Ticker/TickerBox'
import VirtualScroll from '~/components/VirtualScroll/VirtualScroll'
import { marketsInvoke } from '~/features/markets/marketsSlice'
import { tickersInvoke, tickersUpdate } from '~/features/tickers/tickersSlice'
import { useAppDispatch, useAppSelector } from '~/hooks'
import useMarketsQuery from '~/hooks/queries/useMarketsQuery'
import useTickersQuery from '~/hooks/queries/useTickersQuery'
import useUpbit from '~/hooks/useUpbit.websocket'

const Blocked = styled.div``

function TestButton() {
 const dispatch = useAppDispatch()

 const [y, setY] = useState<number>(0)
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
    <Star fill="#de0000" width={15} />
    <Star fill="#DDDDDD" width={15} />
    <Image src="/svgs/star_fill.svg" color="#a70f0f" width={15} height={15} alt="star" />
    <button type="button" onClick={() => setCount((prev) => prev + 1)}>
     +1
    </button>
    <button type="button" onClick={() => setCount((prev) => prev - 1)}>
     -1
    </button>
    <p>#{tickers.filter((v) => v.market.startsWith('KRW-')).length}</p>
    <div className="virtualscroll sticky top-20 h-[865px]" onScroll={(e) => setY(e.currentTarget.scrollTop)}>
     <VirtualScroll height={865} itemHeight={46} offsetY={y}>
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
