import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '~/features/counter/counterSlice'
import marketInfoReducer from '~/features/marketInfo/marketInfoSlice'
import marketsReducer from '~/features/markets/marketsSlice'
import noticeReducer from '~/features/notice/noticeSlice'

export const store = configureStore({
 reducer: { counter: counterReducer, notice: noticeReducer, markets: marketsReducer, marketInfo: marketInfoReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
