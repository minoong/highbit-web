'use client'

import { useDispatch } from 'react-redux'

import { useAppSelector } from '~/hooks'

import type { RootState } from '~/store/store'

import { decrement, increment } from './counterSlice'

export function Counter() {
 const count = useAppSelector((state: RootState) => state.counter.value)
 const dispatch = useDispatch()

 return (
  <div>
   <div>
    <button aria-label="Increment value" onClick={() => dispatch(increment())}>
     Increment
    </button>
    <span>{count}</span>
    <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
     Decrement
    </button>
   </div>
  </div>
 )
}
