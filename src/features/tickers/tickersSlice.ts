import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '~/store/store'
import type { Ticker } from '~/types/apis/ticker'
import type { TickerSocket } from '~/types/apis/ticker.socket'
import { createSelector } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import Hangul from 'hangul-js'

export type TickerSortType =
 | 'tradePrice24hDesc'
 | 'tradePrice24hAsc'
 | 'changeRateDesc'
 | 'changeRateAsc'
 | 'tradePriceDesc'
 | 'tradePriceAsc'

export type TickerState = {
 tickers: (Pick<
  Ticker,
  | 'market'
  | 'opening_price'
  | 'high_price'
  | 'low_price'
  | 'trade_price'
  | 'prev_closing_price'
  | 'change'
  | 'signed_change_price'
  | 'signed_change_rate'
  | 'acc_trade_price_24h'
  | 'acc_trade_volume_24h'
 > &
  Pick<TickerSocket, 'market_warning'>)[]
 search: string
 sort: TickerSortType
}

const initialState: TickerState = {
 tickers: [],
 search: '',
 sort: 'tradePrice24hDesc',
}

export const tickersSlice = createSlice({
 name: 'tickers',
 initialState,
 reducers: {
  tickersInvoke: (state, action: PayloadAction<Ticker[]>) => {
   state.tickers = action.payload.map(
    ({
     market,
     opening_price,
     high_price,
     low_price,
     trade_price,
     prev_closing_price,
     change,
     signed_change_price,
     signed_change_rate,
     acc_trade_price_24h,
     acc_trade_volume_24h,
    }) => ({
     market,
     opening_price,
     high_price,
     low_price,
     trade_price,
     prev_closing_price,
     change,
     signed_change_price,
     signed_change_rate,
     acc_trade_price_24h,
     acc_trade_volume_24h,
     market_warning: 'NONE',
    }),
   )
  },
  tickersUpdate: (state, action: PayloadAction<TickerSocket[]>) => {
   const convert = action.payload.map(
    ({
     code,
     opening_price,
     high_price,
     low_price,
     trade_price,
     prev_closing_price,
     change,
     signed_change_price,
     signed_change_rate,
     acc_trade_price_24h,
     acc_trade_volume_24h,
     market_warning,
    }) => ({
     market: code,
     opening_price,
     high_price,
     low_price,
     trade_price,
     prev_closing_price,
     change,
     signed_change_price,
     signed_change_rate,
     acc_trade_price_24h,
     acc_trade_volume_24h,
     market_warning,
    }),
   )
   const data = state.tickers.map((acc) => {
    const search = convert.filter((v) => v.market === acc.market).at(-1)

    return search || acc
   })

   const newData = [
    ...data,
    ...convert.filter((value) => data.every((matchedData) => matchedData.market !== value.market)),
   ]

   state.tickers = newData
  },
  tickerSearch: (state, action: PayloadAction<string>) => {
   state.search = action.payload
  },
  tickerSort: (state, action: PayloadAction<TickerSortType>) => {
   state.sort = action.payload
  },
 },
})

const selectTicker = (state: RootState) => {
 const search = state.tickers.search
 const markets = state.markets.markets
 const sortType = state.tickers.sort
 const reg = new RegExp(search, 'ig')
 const korReg = new RegExp(
  Hangul.d(search, true)
   .map((s) => s[0])
   .join(''),
  'ig',
 )

 return state.tickers.tickers
  .filter(
   (marketData) =>
    reg.test(markets.find((v) => v.market === marketData.market)?.english_name || '') ||
    reg.test(marketData.market.split('-')[1]) ||
    Hangul.disassembleToString(markets.find((v) => v.market === marketData.market)?.korean_name || '').includes(
     Hangul.disassembleToString(search),
    ) ||
    (!Hangul.isComplete(search) &&
     korReg.test(
      Hangul.d(markets.find((v) => v.market === marketData.market)?.korean_name || '', true)
       .map((kor) => kor[0])
       .join(''),
     )),
  )
  .sort((a, b) => {
   if (sortType === 'tradePrice24hDesc') {
    return b.acc_trade_price_24h - a.acc_trade_price_24h
   } else if (sortType === 'tradePrice24hAsc') {
    return a.acc_trade_price_24h - b.acc_trade_price_24h
   } else if (sortType === 'changeRateDesc') {
    return b.signed_change_rate - a.signed_change_rate
   } else if (sortType === 'changeRateAsc') {
    return a.signed_change_rate - b.signed_change_rate
   } else if (sortType === 'tradePriceDesc') {
    return b.trade_price - a.trade_price
   } else if (sortType === 'tradePriceAsc') {
    return a.trade_price - b.trade_price
   } else {
    return b.acc_trade_price_24h - a.acc_trade_price_24h
   }
  })
}

export const tickerSelector = createSelector(selectTicker, (tickers) => tickers)

export const { tickersInvoke, tickersUpdate, tickerSearch, tickerSort } = tickersSlice.actions

const tickersReducer = tickersSlice.reducer

export default tickersReducer
