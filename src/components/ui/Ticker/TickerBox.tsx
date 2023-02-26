import type { Market } from '~/types/apis/market'
import type { Ticker } from '~/types/apis/ticker'
import Link from 'next/link'
import React, { useMemo, useRef } from 'react'
import Star from '~/assets/svgs/star_fill.svg'
import AloneCandle from '~/components/Chart/AloneCandle'
import Price from '~/components/ui/Ticker/Price'
import { marketSelected } from '~/features/marketInfo/marketInfoSlice'
import { useAppDispatch } from '~/hooks'
import { MarketUtils } from '~/utils/marketUtils'

type Props = Pick<Market, 'market' | 'korean_name'> &
 Pick<
  Ticker,
  | 'change'
  | 'opening_price'
  | 'trade_price'
  | 'high_price'
  | 'low_price'
  | 'signed_change_rate'
  | 'signed_change_price'
  | 'acc_trade_price_24h'
 >

function TickerBox(props: Props) {
 const {
  market,
  korean_name,
  change,
  opening_price,
  trade_price,
  high_price,
  low_price,
  signed_change_rate,
  signed_change_price,
  acc_trade_price_24h,
 } = props

 const linkRef = useRef<HTMLAnchorElement>(null)
 const dispatch = useAppDispatch()

 const marketKrwSymbol = useMemo(() => {
  const [krw, symbol] = market.split('-')

  return `${symbol}/${krw}`
 }, [market])

 const currentChange = MarketUtils.getChageColor('text-', change, '[#333333]')

 const handleSelectCoin = (symbol: string) => {
  dispatch(marketSelected(symbol))
 }

 return (
  <div
   className="flex h-[46px] w-[400px] max-w-[400px] cursor-default flex-wrap items-center bg-white text-xs text-[#333333] hover:bg-[#f4f5f8]"
   aria-hidden
   onClick={() => {
    linkRef.current?.click()
   }}
  >
   <div className="flex w-[26px] justify-center pl-3">
    <Star fill="#DDDDDD" width={15} />
   </div>
   <div className="flex w-[26px] justify-center">
    <svg width={7} height={27}>
     <AloneCandle
      change={change}
      width={7}
      height={27}
      data={{
       opening: opening_price,
       trade: trade_price,
       high: high_price,
       low: low_price,
      }}
     />
    </svg>
   </div>
   <div className="w-[94px]">
    <Link
     ref={linkRef}
     className="!cursor-pointer text-xs font-bold hover:underline"
     href={`/exchange?code=${market}`}
     onClick={() => {
      handleSelectCoin(market)
     }}
    >
     {korean_name}
    </Link>
    <div className="text-[6px] font-semibold text-gray-500">{marketKrwSymbol}</div>
   </div>
   <div className="w-[88px]">
    <Price tradePrice={trade_price} previousChnage={change} />
   </div>
   <div className="w-[78px]">
    <div className={`${currentChange} text-right text-[6px] font-semibold`}>
     <div>
      {signed_change_rate > 0 ? '+' : ''}
      {(signed_change_rate * 100).toFixed(2)}%
     </div>
     <div>{MarketUtils.getPricePretty(signed_change_price)}</div>
    </div>
   </div>
   <div className="w-[88px]">
    <div className="pr-3 text-right">
     <span className="text-[6px] font-semibold">{MarketUtils.numberToHuman(acc_trade_price_24h)[0]}</span>
     <span className="text-[6px] font-semibold text-gray-500">{MarketUtils.numberToHuman(acc_trade_price_24h)[1]}</span>
    </div>
   </div>
  </div>
 )
}

export default React.memo(TickerBox)
