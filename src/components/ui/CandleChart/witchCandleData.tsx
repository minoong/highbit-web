'use client'

import type { Entities } from '~/features/candles/candlesSlice'
import React, { useEffect } from 'react'
import { fetchUserById } from '~/features/candles/candlesSlice'
import { useAppDispatch, useAppSelector } from '~/hooks'

interface WithCandleDataProps {
 data: Entities[]
 handleMoreFetch: () => Promise<void>
}

function witchCandleData() {
 return <TProps extends WithCandleDataProps>(OriginalComponent: React.ComponentClass<TProps>) => {
  return function WithCandleData(props: Omit<TProps, 'data' | 'handleMoreFetch'>) {
   const dispatch = useAppDispatch()
   const symbol = useAppSelector((state) => state.marketInfo.selected)
   const datasets = useAppSelector((state) => state.candles.entities)

   useEffect(() => {
    dispatch(fetchUserById(symbol))
   }, [symbol, dispatch])

   const handleMoreFetch = async () => {
    dispatch(fetchUserById(symbol))
   }

   if (!datasets || datasets.length < 1) return <div>djsfl</div>

   return (
    <OriginalComponent
     key={symbol}
     {...(props as TProps)}
     data={[...datasets].map(({ close, date, high, low, open, time, volume }) => ({
      close,
      date: new Date(date),
      high,
      low,
      open,
      time,
      volume,
     }))}
     handleMoreFetch={handleMoreFetch}
    />
   )
  }
 }
}

export default witchCandleData
