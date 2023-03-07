import type { DailyCandle } from '~/types/apis/candle'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useDailyCoinPriceQuery(symbol: string) {
 return useInfiniteQuery({
  queryKey: ['dailyCoinPrice', symbol],
  queryFn: async ({ pageParam = new Date().toISOString() }) => {
   const { data } = await axios.get<DailyCandle[]>(
    `https://api.upbit.com/v1/candles/days?market=${symbol}&to=${pageParam}&count=15`,
   )

   return data
  },
  getNextPageParam: (lastPage) => {
   const nextPage = lastPage.at(-1)?.candle_date_time_utc
   return nextPage
  },
  suspense: true,
 })
}
