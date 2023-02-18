import type { PayloadAction } from '@reduxjs/toolkit'
import type { Market } from '~/types/apis/market'
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

export const { marketsInvoke } = marketSlice.actions

const marketsReducer = marketSlice.reducer

export default marketsReducer
