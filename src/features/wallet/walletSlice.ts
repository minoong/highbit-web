import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

export type WalletState = {
 currencyMoney: number
}

const initialState: WalletState = {
 currencyMoney: 0,
}

export const walletSlice = createSlice({
 name: 'wallet',
 initialState,
 reducers: {
  setCurrencyMoney: (state, action: PayloadAction<number>) => {
   state.currencyMoney = action.payload
  },
 },
})

export const { setCurrencyMoney } = walletSlice.actions

const walletReducer = walletSlice.reducer

export default walletReducer
