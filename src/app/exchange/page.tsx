'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Suspense } from 'react'

import Buy from '~/components/ui/Buy/Buy'
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
      <div className="grid grid-cols-[490px_490px] gap-2">
       <Suspense
        fallback={
         <div className="h-[700px] w-[490px] animate-pulse">
          <div className="h-full w-full rounded-sm bg-slate-700"></div>
         </div>
        }
       >
        <OrderBookContainer />
       </Suspense>
       {/* <div className="h-[700px] w-[490px] animate-pulse">
        <div className="h-full w-full rounded-sm bg-slate-700"></div>
       </div> */}
       <div className="h-[700px] w-[490px] bg-white">
        <Tabs isFitted>
         <TabList height="45px">
          <Tab
           className="font-extrabold hover:underline"
           _focus={{ color: '#c84a31', borderBottom: '1px solid #c84a31' }}
           _selected={{ color: '#c84a31', borderBottom: '1px solid #c84a31' }}
          >
           매수
          </Tab>
          <Tab
           className="font-extrabold hover:underline"
           _focus={{ color: '#1261c4', borderBottom: '1px solid #1261c4' }}
           _selected={{ color: '#1261c4', borderBottom: '1px solid #1261c4' }}
          >
           매도
          </Tab>
          <Tab className="font-extrabold hover:underline" _focus={{ color: '#333333' }}>
           간편주문
          </Tab>
          <Tab className="font-extrabold hover:underline" _focus={{ color: '#333333' }}>
           거래내역
          </Tab>
         </TabList>
         <TabPanels>
          <TabPanel padding={0}>
           <Buy />
          </TabPanel>
          <TabPanel padding={0}>
           <Buy />
          </TabPanel>
         </TabPanels>
        </Tabs>
       </div>
      </div>
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
