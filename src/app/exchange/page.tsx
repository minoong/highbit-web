'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Suspense } from 'react'
import { MinutesStockChart } from '~/components/ui/CandleChart/stockChart'
import CoinHeader from '~/components/ui/CoinHeader/CoinHeader'
import DailyCoinPrice from '~/components/ui/DailyCoinPrice/DailyCoinPrice'
import OrderBookContainer from '~/components/ui/OrderBook/OrderBookContainer'
import RealTimeTrade from '~/components/ui/RealTimeTrade/RealTimeTrade'
import Ticker from '~/components/ui/Ticker/Ticker'

const theme = extendTheme({
 styles: {
  global: () => ({
   body: {
    color: 'default',
    bg: '#e9ecf1',
   },
  }),
 },
})

function ExchangePage() {
 return (
  <CacheProvider>
   <ChakraProvider theme={theme}>
    <div className="m-auto mt-4 grid w-[1410px] grid-cols-[990px_400px] gap-5">
     <div className="flex flex-col gap-2">
      <CoinHeader />
      <div className="h-[500px] bg-white">
       <MinutesStockChart dateTimeFormat="%Y-%m-%d %H:%M" />
      </div>
      <Suspense
       fallback={
        <div className="h-[700px] w-[490px] animate-pulse">
         <div className="h-full w-full rounded-sm bg-slate-700"></div>
        </div>
       }
      >
       <OrderBookContainer />
      </Suspense>
      <article className="h-[436px] bg-white">
       <Tabs isFitted>
        <TabList height="45px">
         <Tab className="font-extrabold hover:underline">체결</Tab>
         <Tab className="font-extrabold hover:underline">일별</Tab>
        </TabList>
        <TabPanels>
         <TabPanel padding={0}>
          <Suspense fallback={<div>Loading...</div>}>
           <RealTimeTrade />
          </Suspense>
         </TabPanel>
         <TabPanel padding={0}>
          <Suspense fallback={<div>Loading...</div>}>
           <DailyCoinPrice />
          </Suspense>
         </TabPanel>
        </TabPanels>
       </Tabs>
      </article>
     </div>
     <div className="sticky top-20 h-[993px] bg-white">
      <Suspense
       fallback={
        <div className="h-[993px] w-[400px] animate-pulse">
         <div className="h-full w-full rounded-sm bg-slate-700"></div>
        </div>
       }
      >
       <Ticker />
      </Suspense>
     </div>
    </div>
   </ChakraProvider>
  </CacheProvider>
 )
}

export default ExchangePage
