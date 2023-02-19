import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '~/store/store'
import type { Market } from '~/types/apis/market'
import { createSelector } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type MarketsState = {
 markets: Market[]
}

const initialState: MarketsState = {
 markets: [],
}

export const marketSlice = createSlice({
 name: 'markets',
 initialState,
 reducers: {
  marketsInvoke: (state, action: PayloadAction<Market[]>) => {
   state.markets = action.payload
  },
 },
})

const selectMarketsForLocation = (state: RootState) =>
 state.markets.markets.filter((market) => market.market.split('-')[0] === state.marketInfo.location) as Market[]

export const marketsForLocationSelector = createSelector(selectMarketsForLocation, (markets) =>
 markets.map(({ market }) => market).join(','),
)

export const { marketsInvoke } = marketSlice.actions

const marketsReducer = marketSlice.reducer

export default marketsReducer
