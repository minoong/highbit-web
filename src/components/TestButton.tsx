'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import TickerBox from '~/components/ui/Ticker/TickerBox'
import TickerSearch from '~/components/ui/Ticker/TickerSearch'
import TickerSort from '~/components/ui/Ticker/TickerSort'
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
  <CacheProvider>
   <ChakraProvider>
    <Blocked>
     <div>
      <div className="sticky top-20 h-[959px]">
       <TickerSearch />

       <Tabs isFitted size="sm">
        <TabList>
         <Tab>
          <div className="font-extrabold hover:underline">원화</div>
         </Tab>
         <Tab>
          <div className="font-extrabold hover:underline">보유</div>
         </Tab>
         <Tab>
          <div className="font-extrabold hover:underline">관심</div>
         </Tab>
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
         <TabPanel>
          <div className="mt-20 flex h-full items-center justify-center text-xs font-semibold text-neutral-700/70">
           로그인하면 내 관심코인을 확인할 수 있습니다.
          </div>
         </TabPanel>
        </TabPanels>
       </Tabs>
      </div>
     </div>
    </Blocked>
   </ChakraProvider>
  </CacheProvider>
 )
}

export default TestButton
