import type { Ticker } from '~/types/apis/ticker'
import type { UniversalUseQueryOptions } from '~/types/react-query/universal'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { marketsForLocationSelector } from '~/features/markets/marketsSlice'
import { useAppSelector } from '~/hooks/useAppSelector'

async function getTickers(symbols: string) {
 const { data } = await axios.get<Ticker[]>(`https://api.upbit.com/v1/ticker?markets=${symbols}`)

 return data
}

type GetTickers = typeof getTickers

function useTickersQuery<T = GetTickers>(options: UniversalUseQueryOptions<GetTickers, T> = {}) {
 const symbols = useAppSelector(marketsForLocationSelector)

 return useQuery({
  queryKey: ['tickers', symbols],
  queryFn: () => getTickers(symbols),
  ...options,
 })
}

export default useTickersQuery
