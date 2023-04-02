import { createContext, useContext } from 'react'

export interface PriceInputContextType {
 value: number
 gap: number
 increase: (value: number) => void
 decrease: (value: number) => void
 change: (value: number) => void
}

export const PriceInputContext = createContext<PriceInputContextType | undefined>(undefined)

export function usePriceInputContext(): PriceInputContextType {
 const context = useContext(PriceInputContext)

 if (!context) {
  throw new Error('usePriceInputContext should be used within the PriceInputContext provider!')
 }

 return context
}
