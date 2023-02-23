import { Suspense } from 'react'
import CoinHeader from '~/components/ui/CoinHeader/CoinHeader'
import OrderBookContainer from '~/components/ui/OrderBook/OrderBookContainer'
import TestButton from '~/components/TestButton'

function ExchangePage() {
 return (
  <div className="m-auto mt-4 grid w-[1410px] grid-cols-[990px_400px] gap-5">
   <div className="flex flex-col gap-2">
    <CoinHeader />
    <div className="h-[500px] bg-white">
     <div>차트</div>
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
 )
}

export default ExchangePage
