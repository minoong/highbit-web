import type { PayloadAction } from '@reduxjs/toolkit'
import type { ComponentProps, FunctionComponent } from 'react'
import { createAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type ModalsType = {
 modals: Array<{ Component: FunctionComponent<any>; props: ComponentProps<FunctionComponent<any>> }>
}

interface GenericIdentityFn<T extends FunctionComponent<any> = FunctionComponent<any>> {
 Component: T
}

const initialState: ModalsType = {
 modals: [],
}

function prepare<T extends FunctionComponent<any>>(Component: T, props: Omit<ComponentProps<T>, 'open'>) {
 return {
  payload: {
   Component,
   props,
  },
 }
}

const handleOpenModal = createAction<typeof prepare>('global/modals/dsfad', prepare)

export const wrapperHandleOpenModal = <T extends FunctionComponent<any>>(
 Component: T,
 props: Omit<ComponentProps<T>, 'open'>,
) => {
 return handleOpenModal(Component, props)
}

export const modalsSlice = createSlice({
 name: 'global/modals',
 initialState,
 reducers: {
  closeModal: (state, action: PayloadAction<GenericIdentityFn>) => {
   const { Component } = action.payload

   state.modals = state.modals.filter((modal) => modal.Component !== Component)
  },
 },
 extraReducers(builder) {
  builder.addCase(handleOpenModal, (state, action) => {
   const { Component, props } = action.payload
   state.modals.push({ Component, props: { ...props, open: true } })
  })
 },
})

export const { closeModal } = modalsSlice.actions

const modalsReducer = modalsSlice.reducer

export default modalsReducer
