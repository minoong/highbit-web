import type { PayloadAction } from '@reduxjs/toolkit'

import { createSelector } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '~/store/store'

type KRW = 'KRW'
type BTC = 'BTC'
type USDT = 'USDT'
type BOOK_MARK = 'BOOK_MARK'
type BALANCE = 'BALANCE'

type MarketLocation = KRW | BTC | USDT | BOOK_MARK | BALANCE

export type MarketInfoState = {
 selected: string
 location: MarketLocation
}

const initialState: MarketInfoState = {
 selected: 'KRW-BTC',
 location: 'KRW',
}

export const marketInfoSlice = createSlice({
 name: 'marketInfo',
 initialState,
 reducers: {
  marketSelected: (state, action: PayloadAction<string>) => {
   state.selected = action.payload
  },
  marketLocation: (state, action: PayloadAction<MarketLocation>) => {
   state.location = action.payload
  },
 },
})

export const { marketSelected, marketLocation } = marketInfoSlice.actions

const selectSelectedMarket = (state: RootState) => state.marketInfo.selected

export const selectedMarketSelector = createSelector(
 selectSelectedMarket,
 (selectedMarket) => selectedMarket || 'KRW-BTC',
)

export const selectedMarketObjectSelector = createSelector(
 selectSelectedMarket,
 (state: RootState) => state.markets.markets,
 (selectedMarket, markets) => markets.filter((market) => market.market === selectedMarket),
)

export const symbolWithCurrencySelector = createSelector([selectedMarketSelector], (selectedMarket) => {
 const [symbol, currency] = selectedMarket.split('-')

 return [symbol, currency] as const
})

const marketInfoReducer = marketInfoSlice.reducer

export default marketInfoReducer
