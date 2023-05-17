import type { SerializedError } from '@reduxjs/toolkit'
import type { CandleMinute } from '~/types/apis/candle'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { tickersUpdate } from '~/features/tickers/tickersSlice'

import type { RootState } from '~/store/store'

import type { Candle } from '~/types/common'

export type Entities<T = number> = Candle<T> & {
 time: {
  day: number
  month: number
  year: string
 }
}

export type CandleState = {
 symbol: string
 entities: Entities[]
 loading: 'idle' | 'pending'
 currentRequestId: undefined | string
 error: null | SerializedError
}

export const fetchUserById = createAsyncThunk<
 { symbol: string; entities: Entities[] },
 string,
 {
  state: RootState
 }
>('candles/fetchByIdStatus', async (test, { getState, requestId }) => {
 const { currentRequestId, loading } = getState().candles
 if (loading !== 'pending' || requestId !== currentRequestId) {
  return { symbol: getState().candles.symbol, entities: getState().candles.entities }
 }

 const symbols = getState().marketInfo.selected
 const isMatched = symbols === getState().candles.symbol
 const datetime =
  !isMatched || getState().candles.entities.length < 1
   ? new Date().toISOString()
   : new Date(getState().candles.entities[0].date).toISOString() || new Date().toISOString()

 const response = await axios
  .get<CandleMinute[]>(`https://api.upbit.com/v1/candles/minutes/1?market=${symbols}&to=${datetime}&count=200`)
  .then(({ data }) =>
   data.reverse().map((candle) => ({
    close: candle.trade_price,
    date: candle.timestamp,
    high: candle.high_price,
    low: candle.low_price,
    open: candle.opening_price,
    volume: candle.candle_acc_trade_volume,
    time: {
     day: new Date(candle.timestamp).getDay(),
     month: new Date(candle.timestamp).getMonth(),
     year: String(new Date(candle.timestamp).getFullYear()),
    },
   })),
  )

 if (symbols !== getState().candles.symbol) {
  return { symbol: symbols, entities: response }
 } else {
  return { symbol: symbols, entities: [...response, ...getState().candles.entities] }
 }
})

const initialState: CandleState = {
 symbol: 'KRW-BTC',
 entities: [],
 loading: 'idle',
 currentRequestId: undefined,
 error: null,
}

const candlesSlice = createSlice({
 name: 'candles',
 initialState,
 reducers: {},
 extraReducers: (builder) => {
  builder
   .addCase(fetchUserById.pending, (state, action) => {
    if (state.loading === 'idle') {
     state.loading = 'pending'
     state.currentRequestId = action.meta.requestId
    }
   })
   .addCase(fetchUserById.fulfilled, (state, action) => {
    const { requestId } = action.meta
    if (state.loading === 'pending' && state.currentRequestId === requestId) {
     state.loading = 'idle'
     state.symbol = action.payload.symbol
     state.entities = action.payload.entities
     state.currentRequestId = undefined
    }
   })
   .addCase(fetchUserById.rejected, (state, action) => {
    const { requestId } = action.meta
    if (state.loading === 'pending' && state.currentRequestId === requestId) {
     state.loading = 'idle'
     state.error = action.error
     state.currentRequestId = undefined
    }
   })
   .addCase(tickersUpdate, (state, action) => {
    if (state.loading === 'pending') return

    state.loading = 'pending'

    const lastCandle = state.entities.slice(-1)[0]
    const target = action.payload.find((d) => d.code === state.symbol)
    const current = state

    if (!lastCandle || !target) {
     state.loading = 'idle'
     return
    }

    const { open } = lastCandle
    const high = lastCandle.high > target.trade_price ? lastCandle.high : target.trade_price
    const low = lastCandle.low < target.trade_price ? lastCandle.low : target.trade_price
    const close = target.trade_price
    const needUpdate = current.entities.find((candle) => {
     return (
      new Intl.DateTimeFormat(navigator.language, {
       year: 'numeric',
       month: '2-digit',
       day: '2-digit',
       hour: '2-digit',
       minute: '2-digit',
       hour12: false,
      }).format(candle.date) ===
      new Intl.DateTimeFormat(navigator.language, {
       year: 'numeric',
       month: '2-digit',
       day: '2-digit',
       hour: '2-digit',
       minute: '2-digit',
       hour12: false,
      }).format(new Date(target.timestamp))
     )
    })

    if (needUpdate) {
     const volume = needUpdate.volume + target.trade_volume
     const newData = [...current.entities]
     newData.pop()
     newData.push({
      open,
      high,
      low,
      close,
      volume,
      date: lastCandle.date,
      time: {
       day: new Date(lastCandle.date).getDay(),
       month: new Date(lastCandle.date).getMonth(),
       year: String(new Date(lastCandle.date).getFullYear()),
      },
     })

     state.entities = newData
    } else {
     state.entities = [
      ...state.entities,
      {
       open: close,
       high: close,
       low: close,
       close,
       volume: target.trade_volume,
       date: target.timestamp,
       time: {
        day: new Date(target.timestamp).getDay(),
        month: new Date(target.timestamp).getMonth(),
        year: String(new Date(target.timestamp).getFullYear()),
       },
      },
     ]
    }

    state.loading = 'idle'
   })
 },
})

const candlesReducer = candlesSlice.reducer

export default candlesReducer
