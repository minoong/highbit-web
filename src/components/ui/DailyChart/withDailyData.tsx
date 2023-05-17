'use client'

import type { Entities } from '~/features/candles/candlesSlice'

import { format } from 'd3-format'
import React from 'react'

import useDailyRageTimesQuery from '~/hooks/queries/useDailyRageTimesQuery'

interface WithCandleDataProps {
 data: Entities[]
 openPrice: number
}

function withDailyData() {
 return <TProps extends WithCandleDataProps>(OriginalComponent: React.ComponentClass<TProps>) => {
  return function WithCandleData(props: Omit<TProps, 'data' | 'handleMoreFetch'>) {
   const { data } = useDailyRageTimesQuery({
    suspense: true,
   })

   if (!data || data.length < 1)
    return (
     <div className="h-[50px] w-[140px] animate-pulse">
      <div className="h-full w-full rounded-sm bg-slate-700"></div>
     </div>
    )

   const minPrice = Math.min(...data.map(({ low }) => low))

   return (
    <OriginalComponent
     {...(props as TProps)}
     data={[...data].map(({ close, date, high, low, open, time, volume }) => ({
      close,
      date: new Date(date),
      high,
      low,
      open,
      time,
      volume,
     }))}
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

export default withDailyData
