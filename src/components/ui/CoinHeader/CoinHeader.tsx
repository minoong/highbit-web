'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { shallowEqual } from 'react-redux'

import { DailyStockChart } from '~/components/ui/DailyChart/DailyChart'
import {
 marketSelected,
 selectedMarketObjectSelector,
 symbolWithCurrencySelector,
} from '~/features/marketInfo/marketInfoSlice'
import { useAppDispatch, useAppSelector } from '~/hooks'

import { MarketUtils } from '~/utils/marketUtils'

function CoinHeader() {
 const searchParams = useSearchParams()
 const selectedMarket = useAppSelector(selectedMarketObjectSelector, shallowEqual)
 const ticker = useAppSelector((state) =>
  state.tickers.tickers.find((ticker) => ticker.market === selectedMarket[0].market),
 )
 const dispatch = useAppDispatch()
 const [krw, symbol] = useAppSelector(symbolWithCurrencySelector)

 const marketKrwSymbol = `${symbol}/${krw}`

 useEffect(() => {
  if (!selectedMarket || selectedMarket.length < 1) return
  const currentSymbol = searchParams?.get('code')
  if (currentSymbol && currentSymbol !== selectedMarket[0].market) {
   dispatch(marketSelected(currentSymbol))
  }
 }, [dispatch, searchParams, selectedMarket])

 useEffect(() => {
  if (!marketKrwSymbol || !ticker) return
  document.title = MarketUtils.getPricePretty(ticker.trade_price) + ' ' + marketKrwSymbol
 }, [marketKrwSymbol, ticker])

 if (!ticker || selectedMarket.length < 1)
  return (
   <div className="h-[144px] w-[990px] animate-pulse">
    <div className="h-full w-full rounded-sm bg-slate-700"></div>
   </div>
  )

 const change = MarketUtils.getChageColor('text-', ticker.change, '[#333333]')

 return (
  <div className="flex flex-col gap-2 border-b bg-white p-2">
   <div className="flex items-center gap-3 border-b pb-2">
    <Image
     src={`https://static.upbit.com/logos/${symbol}.png`}
     alt={selectedMarket[0].korean_name}
     width={24}
     height={24}
     priority
    />
    <div className="flex items-end gap-1 font-bold">
     <span className="text-xl">{selectedMarket[0].korean_name}</span>
     <span className="text-[12px] font-normal text-[#666666]">{marketKrwSymbol}</span>
    </div>
   </div>
   <div className={`flex items-center pb-2 ${change} justify-between`}>
    <div className="flex-1">
     <div className="gap-1 text-[32px] font-semibold">
      {MarketUtils.getPricePretty(ticker.trade_price)}
      <span className="pl-1 text-[14px] font-semibold">{krw}</span>
     </div>
     <div className="flex items-center gap-1 font-semibold">
      <span className="text-[11px] text-[#666666]">전일대비</span>
      <span>
       {ticker.change === 'RISE' ? '+' : ''}
       {(ticker.signed_change_rate * 100).toFixed(2)}%
      </span>
      {ticker.change === 'RISE' && (
       <Image src="/images/ico_up.png" className="inline-block" alt="rise" width={10} height={11} />
      )}
      {ticker.change === 'FALL' && (
       <Image src="/images/ico_down.png" className="inline-block" alt="fall" width={10} height={11} />
      )}
      <span className={`items-center ${ticker.change === 'EVEN' && 'm-2'}`}>
       {MarketUtils.getPricePretty(ticker.signed_change_price)}
      </span>
     </div>
    </div>
    <div className="p-2">
     <div className="h-[50px] w-[140px] bg-[#F9FAFB]">
      <DailyStockChart dateTimeFormat="%Y-%m-%d %H:%M" openPrice={ticker.opening_price} />
     </div>
    </div>
    <div className="grid w-[490px] grid-cols-[245px_245px] justify-items-stretch text-xs text-trade-even">
     <div className="flex items-center justify-between border-b p-2">
      <div>고가</div>
      <div className="text-sm font-semibold text-trade-rise">{MarketUtils.getPricePretty(ticker.high_price)}</div>
     </div>
     <div className="flex items-center justify-between border-b p-2">
      <div>거래량(24H)</div>
      <div className="text-sm">
       {MarketUtils.getPricePretty(ticker.acc_trade_volume_24h)}
       <span className="pl-1 text-[11px] font-light text-[#999999]">{symbol}</span>
      </div>
     </div>
     <div className="flex items-center justify-between p-2">
      <div>저가</div>
      <div className="text-sm font-semibold text-trade-fall">{MarketUtils.getPricePretty(ticker.low_price)}</div>
     </div>
     <div className="flex items-center justify-between p-2">
      <div>거래대금(24H)</div>
      <div className="text-xs">
       {MarketUtils.getPricePretty(ticker.acc_trade_price_24h)}
       <span className="pl-1 text-[11px] font-light text-[#999999]">{krw}</span>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default CoinHeader
