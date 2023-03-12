import type { CandleMinute } from '~/types/apis/candle'
import type { UniversalUseQueryOptions } from '~/types/react-query/universal'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { selectedMarketSelector } from '~/features/marketInfo/marketInfoSlice'
import { useAppSelector } from '~/hooks/useAppSelector'
import { MarketUtils } from '~/utils/marketUtils'

export async function getDailyRageTimes(symbol: string) {
 const result = await Promise.all(
  MarketUtils.getDailyRageTimes().map(({ time, count }) =>
   axios.get<CandleMinute[]>(`https://api.upbit.com/v1/candles/minutes/1?market=${symbol}&to=${time}&count=${count}`),
  ),
 ).then((values) =>
  values.map((v) =>
   v.data.reverse().map((candle) => ({
    close: candle.trade_price,
    date: candle.timestamp,
    high: candle.high_price,
    low: candle.low_price,
    open: candle.opening_price,
    volume: candle.candle_acc_trade_volume,
    time: {
     day: new Date(candle.timestamp).getDay(),
     month: new Date(candle.timestamp).getMonth(),
     year: String(new Date(candle.timestamp).getFullYear()),
    },
   })),
  ),
 )

 return result.flat()
}

type GetDailyRageTimes = typeof getDailyRageTimes

function useDailyRageTimesQuery<T = GetDailyRageTimes>(options: UniversalUseQueryOptions<GetDailyRageTimes, T> = {}) {
 const symbol = useAppSelector(selectedMarketSelector)

 return useQuery({
  queryKey: ['daily', 'range', 'times', symbol],
  queryFn: () => getDailyRageTimes(symbol),
  ...options,
 })
}

export default useDailyRageTimesQuery
