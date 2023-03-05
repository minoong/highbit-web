'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Suspense } from 'react'
import { MinutesStockChart } from '~/components/ui/CandleChart/stockChart'
import CoinHeader from '~/components/ui/CoinHeader/CoinHeader'
import OrderBookContainer from '~/components/ui/OrderBook/OrderBookContainer'
import TestButton from '~/components/TestButton'

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

export const metadata = {
 title: 'asdfjklsdjflk',
}

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
      <Suspense fallback={<div>Loading...</div>}>
       <OrderBookContainer />
      </Suspense>
      <article className="h-[436px] bg-white">주문</article>
     </div>
     <div className="sticky top-20 h-[993px] bg-white">
      <Suspense fallback={<div>Loading...</div>}>
       <TestButton />
      </Suspense>
     </div>
    </div>
   </ChakraProvider>
  </CacheProvider>
 )
}

export default ExchangePage
