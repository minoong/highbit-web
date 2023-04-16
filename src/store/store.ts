import { configureStore } from '@reduxjs/toolkit'
import candlesReducer from '~/features/candles/candlesSlice'
import counterReducer from '~/features/counter/counterSlice'
import marketInfoReducer from '~/features/marketInfo/marketInfoSlice'
import marketsReducer from '~/features/markets/marketsSlice'
import modalsReducer from '~/features/modals/ModalsSlice'
import noticeReducer from '~/features/notice/noticeSlice'
import tickersReducer from '~/features/tickers/tickersSlice'
import walletReducer from '~/features/wallet/walletSlice'

export const store = configureStore({
 reducer: {
  counter: counterReducer,
  notice: noticeReducer,
  markets: marketsReducer,
  marketInfo: marketInfoReducer,
  tickers: tickersReducer,
  candles: candlesReducer,
  modals: modalsReducer,
  wallet: walletReducer,
 },
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
