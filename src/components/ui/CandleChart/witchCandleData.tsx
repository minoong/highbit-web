'use client'

import type { Entities } from '~/features/candles/candlesSlice'
import { format } from 'd3-format'
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

   if (!datasets || datasets.length < 1)
    return (
     <div className="h-[500px] w-[990px] animate-pulse">
      <div className="h-full w-full rounded-sm bg-slate-700"></div>
     </div>
    )

   const minPrice = Math.min(...datasets.map(({ low }) => low))

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
     pricesDisplayFormat={format(
      !Number.isInteger(minPrice) && minPrice < 1
       ? `.${String(minPrice).split('.')[1].length}f`
       : minPrice < 100
       ? '.2f'
       : '.1f',
     )}
    />
   )
  }
 }
}

export default witchCandleData
