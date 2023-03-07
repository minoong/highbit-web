import { useState } from 'react'
import VirtualScroll from '~/components/VirtualScroll/VirtualScroll'
import { selectedMarketSelector } from '~/features/marketInfo/marketInfoSlice'
import { useAppSelector } from '~/hooks'
import { useDailyCoinPriceQuery } from '~/hooks/queries/useDailyCoinPriceQuery'
import useIntersectionObserver from '~/hooks/useIntersectionObserver'
import { MarketUtils } from '~/utils/marketUtils'

function DailyCoinPrice() {
 const [y, setY] = useState<number>(0)
 const symbol = useAppSelector(selectedMarketSelector)

 const { data, fetchNextPage, hasNextPage, isFetching } = useDailyCoinPriceQuery(symbol)
 const { ref } = useIntersectionObserver({
  onChange: (inView) => {
   if (data?.pages.length === 5) return

   if (inView && (hasNextPage || !isFetching)) {
    fetchNextPage()
   }
  },
 })

 const datasets = data?.pages.flat() || []
 const [currency, coinCurrency] = symbol.split('-')

 return (
  <div>
   <div className="flex h-[32px] items-center bg-[#F9FAFC] text-right text-xs font-medium text-[#666666]">
    <div className="w-[100px]">일자</div>
    <div className="w-[334px]">종가({currency})</div>
    <div className="w-[270px]">전일대비</div>
    <div className="w-[268px]">거래량({coinCurrency})</div>
   </div>
   <div className="virtualscroll h-[360px]" onScroll={(e) => setY(e.currentTarget.scrollTop)}>
    <VirtualScroll height={360} itemHeight={32} offsetY={y} key={symbol}>
     {datasets.map((item) => {
      const change = MarketUtils.getChageColor(
       'text-',
       item.change_rate > 0 ? 'RISE' : item.change_rate === 0 ? 'EVEN' : 'FALL',
       '[#333333]',
      )
      return (
       <div
        key={item.candle_date_time_utc}
        className="flex h-[32px] items-center text-right text-xs font-medium even:bg-[#F9FAFC]"
       >
        <div className="w-[100px] text-[#666666]">
         {new Intl.DateTimeFormat('ko-KR', { month: '2-digit', day: '2-digit' }).format(
          new Date(item.candle_date_time_utc),
         )}
        </div>
        <div className={`w-[334px] font-bold ${change}`}>{MarketUtils.getPricePretty(item.trade_price)}</div>
        <div className={`w-[190px] ${change}`}>{MarketUtils.getPricePretty(Math.abs(item.change_price))}</div>
        <div className={`w-[90px] ${change}`}>
         {item.change_rate > 0 ? '+' : ''}
         {(item.change_rate * 100).toFixed(2)}%
        </div>
        <div className="w-[286px] pr-[14px] text-[#333333]">
         {MarketUtils.getPricePretty(item.candle_acc_trade_volume).split('.')[0]}
        </div>
       </div>
      )
     })}
    </VirtualScroll>
    <div ref={ref} />
   </div>
  </div>
 )
}

export default DailyCoinPrice
