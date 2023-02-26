import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '~/store/store'
import type { Ticker } from '~/types/apis/ticker'
import type { TickerSocket } from '~/types/apis/ticker.socket'
import { createSelector } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import Hangul from 'hangul-js'

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
}

const initialState: TickerState = {
 tickers: [],
 search: '',
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
 },
})

const selectTicker = (state: RootState) => {
 const search = state.tickers.search
 const markets = state.markets.markets
 const reg = new RegExp(search, 'ig')
 const korReg = new RegExp(
  Hangul.d(search, true)
   .map((s) => s[0])
   .join(''),
  'ig',
 )

 return state.tickers.tickers.filter(
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
}

export const tickerSelector = createSelector(selectTicker, (tickers) => tickers)

export const { tickersInvoke, tickersUpdate, tickerSearch } = tickersSlice.actions

const tickersReducer = tickersSlice.reducer

export default tickersReducer
