import type { AskBid } from '~/types/apis/common'
import { createContext, useContext } from 'react'

export type OrderBookType = {
 askBid: AskBid
}

export const OrderBookContext = createContext<OrderBookType | undefined>(undefined)

export function useOrderBookContext(): OrderBookType {
 const context = useContext(OrderBookContext)

 if (!context) {
  throw new Error('useOrderBookContext should be used within the OrderBookContext provider!')
 }

 return context
}
