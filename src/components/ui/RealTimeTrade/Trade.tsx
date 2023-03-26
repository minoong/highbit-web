import clsx from 'clsx'
import dayjs from 'dayjs'
import React from 'react'
import { Trade } from '~/types/apis/trade.socket'
import { MarketUtils } from '~/utils/marketUtils'

interface Props {
 data: Trade
}

function Trade(props: Props) {
 const {
  data: { ask_bid, change, trade_price, trade_volume, trade_timestamp },
 } = props

 const currentChange = MarketUtils.getChageColor('text-', change, '[#333333]')
 const askBid = `${clsx(ask_bid === 'BID' && 'text-trade-rise', ask_bid === 'ASK' && 'text-trade-fall')}`

 return (
  <div className="flex h-[35px] w-fit items-center text-right text-[11px] text-[#666666] even:bg-[#F9FAFC]">
   <div className="w-[96px] text-center">
    <span className="text-[#333333]">{dayjs(trade_timestamp).format('MM.DD')}</span>
    <span className={`text-[#999999] before:content-['_']`}>{dayjs(trade_timestamp).format('HH.mm')}</span>
   </div>
   <div className={`w-[300px] ${currentChange} font-medium`}>{MarketUtils.getPricePretty(trade_price)}</div>
   <div className={`w-[280px] ${askBid}`}>{trade_volume}</div>
   <div className="w-[314px] pr-[14px] font-medium">{MarketUtils.getPricePretty(trade_price * trade_volume)}</div>
  </div>
 )
}

export default React.memo(Trade)
