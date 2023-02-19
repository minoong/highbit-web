import type { PayloadAction } from '@reduxjs/toolkit'
import type { Ticker } from '~/types/apis/ticker'
import type { TickerSocket } from '~/types/apis/ticker.socket'
import { createSlice } from '@reduxjs/toolkit'

export type TickerState = {
 tickers: (Pick<
  Ticker,
  | 'market'
  | 'opening_price'
  | 'high_price'
  | 'low_price'
  | 'trade_price'
  | 'change'
  | 'signed_change_price'
  | 'signed_change_rate'
  | 'acc_trade_price_24h'
 > &
  Pick<TickerSocket, 'market_warning'>)[]
}

const initialState: TickerState = {
 tickers: [],
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
     change,
     signed_change_price,
     signed_change_rate,
     acc_trade_price_24h,
    }) => ({
     market,
     opening_price,
     high_price,
     low_price,
     trade_price,
     change,
     signed_change_price,
     signed_change_rate,
     acc_trade_price_24h,
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
     change,
     signed_change_price,
     signed_change_rate,
     acc_trade_price_24h,
     market_warning,
    }) => ({
     market: code,
     opening_price,
     high_price,
     low_price,
     trade_price,
     change,
     signed_change_price,
     signed_change_rate,
     acc_trade_price_24h,
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
 },
})

export const { tickersInvoke, tickersUpdate } = tickersSlice.actions

const tickersReducer = tickersSlice.reducer

export default tickersReducer
