'use client'

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import TickerBox from '~/components/ui/Ticker/TickerBox'
import TickerSearch from '~/components/ui/Ticker/TickerSearch'
import TickerSort from '~/components/ui/Ticker/TickerSort'
import VirtualScroll from '~/components/VirtualScroll/VirtualScroll'
import { marketsInvoke } from '~/features/markets/marketsSlice'
import { tickerSelector, tickersInvoke, tickersUpdate } from '~/features/tickers/tickersSlice'
import { useAppDispatch, useAppSelector } from '~/hooks'
import useMarketsQuery from '~/hooks/queries/useMarketsQuery'
import useTickersQuery from '~/hooks/queries/useTickersQuery'
import { useCoinBookMark } from '~/hooks/useCoinBookMark'
import useUpbit from '~/hooks/useUpbit.websocket'

function Ticker() {
 const dispatch = useAppDispatch()

 const [y, setY] = useState<number>(0)
 const markets = useAppSelector((state) => state.markets.markets)
 const tickers = useAppSelector(tickerSelector)
 const { status } = useSession()

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
 const [coinBookMarkList] = useCoinBookMark()

 useEffect(() => {
  dispatch(tickersUpdate(socketData))
 }, [dispatch, socketData])

 return (
  <div>
   <div className="sticky top-20 h-[959px]">
    <TickerSearch />

    <Tabs isFitted size="sm">
     <TabList>
      <Tab className="font-extrabold hover:underline">원화</Tab>
      <Tab className="font-extrabold hover:underline">보유</Tab>
      <Tab className="font-extrabold hover:underline">관심</Tab>
     </TabList>
     <TabPanels>
      <TabPanel padding={0}>
       <TickerSort />
       <div className="virtualscroll sticky h-[865px]" onScroll={(e) => setY(e.currentTarget.scrollTop)}>
        <VirtualScroll height={865} itemHeight={46} offsetY={y}>
         {tickers
          .filter((v) => v.market.startsWith('KRW-'))
          .map((ticker) => (
           <TickerBox
            key={ticker.market}
            {...ticker}
            isBookMark={coinBookMarkList.includes(ticker.market)}
            market={markets.find((v) => v.market === ticker.market)?.market || ''}
            korean_name={markets.find((v) => v.market === ticker.market)?.korean_name || ''}
           />
          ))}
        </VirtualScroll>
       </div>
      </TabPanel>
      <TabPanel>
       <div className="mt-20 flex h-full items-center justify-center text-xs font-semibold text-neutral-700/70">
        로그인하면 내 보유자산을 확인할 수 있습니다.
       </div>
      </TabPanel>
      <TabPanel padding={0}>
       {status !== 'authenticated' && (
        <div className="mt-20 flex h-full items-center justify-center text-xs font-semibold text-neutral-700/70">
         로그인하면 내 관심코인을 확인할 수 있습니다.
        </div>
       )}
       {status === 'authenticated' && !coinBookMarkList.length && (
        <div className="mt-20 flex h-full items-center justify-center text-xs font-semibold text-neutral-700/70">
         등록된 관심코인이 없습니다. 관심코인을 등록해 주세요.
        </div>
       )}
       {status === 'authenticated' && coinBookMarkList.length ? (
        <>
         <TickerSort />
         <div className="virtualscroll sticky h-[865px]" onScroll={(e) => setY(e.currentTarget.scrollTop)}>
          <VirtualScroll height={865} itemHeight={46} offsetY={y}>
           {tickers
            .filter((v) => v.market.startsWith('KRW-'))
            .filter((v) => coinBookMarkList.includes(v.market))
            .map((ticker) => (
             <TickerBox
              key={ticker.market}
              {...ticker}
              isBookMark={coinBookMarkList.includes(ticker.market)}
              market={markets.find((v) => v.market === ticker.market)?.market || ''}
              korean_name={markets.find((v) => v.market === ticker.market)?.korean_name || ''}
             />
            ))}
          </VirtualScroll>
         </div>
        </>
       ) : null}
      </TabPanel>
     </TabPanels>
    </Tabs>
   </div>
  </div>
 )
}

export default React.memo(Ticker)
