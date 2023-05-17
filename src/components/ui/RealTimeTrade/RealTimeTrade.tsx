import React, { useState } from 'react'

import Trade from '~/components/ui/RealTimeTrade/Trade'
import VirtualScroll from '~/components/VirtualScroll/VirtualScroll'
import { selectedMarketObjectSelector, symbolWithCurrencySelector } from '~/features/marketInfo/marketInfoSlice'
import { useAppSelector } from '~/hooks'

import useUpbit from '~/hooks/useUpbit.websocket'

function RealTimeTrade() {
 const [y, setY] = useState<number>(0)
 const [currency, coinCurrency] = useAppSelector(symbolWithCurrencySelector)
 const marketCodes = useAppSelector(selectedMarketObjectSelector)

 const { socketData = [] } = useUpbit(marketCodes, 'trade')

 return (
  <div>
   <div className="flex h-[32px] items-center bg-[#F9FAFC] text-right text-xs font-medium text-[#666666]">
    <div className="w-[96px]">체결시간</div>
    <div className="w-[300px]">체결가격({currency})</div>
    <div className="w-[280px]">체결량(LOOM)</div>
    <div className="w-[314px] pr-[14px]">체결금액({coinCurrency})</div>
   </div>
   <div className="virtualscroll h-[360px]" onScroll={(e) => setY(e.currentTarget.scrollTop)}>
    <VirtualScroll height={360} itemHeight={35} offsetY={y}>
     {socketData.map((data, i) => (
      <Trade key={i} data={data} />
     ))}
    </VirtualScroll>
   </div>
  </div>
 )
}

export default RealTimeTrade
