import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

export type NoticeState = {
 offset: number
 page: number
}

const initialState: NoticeState = {
 offset: 0,
 page: 1,
}

export const noticeSlice = createSlice({
 name: 'notice',
 initialState,
 reducers: {
  moveOffset: (state, action: PayloadAction<number>) => {
   state.offset = (action.payload - 1) * 5
   state.page = action.payload
  },
  clear: (state) => {
   state.offset = 0
   state.page = 1
  },
 },
})

export const { moveOffset, clear } = noticeSlice.actions

const noticeReducer = noticeSlice.reducer

export default noticeReducer
