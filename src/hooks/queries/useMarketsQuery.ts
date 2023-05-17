import type { Market } from '~/types/apis/market'
import type { UniversalUseQueryOptions } from '~/types/react-query/universal'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

async function getMarkets() {
 const { data } = await axios.get<Market[]>(`https://api.upbit.com/v1/market/all`)

 return data
}

type GetMarkets = typeof getMarkets

function useMarketsQuery<T = GetMarkets>(options: UniversalUseQueryOptions<GetMarkets, T> = {}) {
 return useQuery({
  queryKey: ['market', 'all'],
  queryFn: getMarkets,
  ...options,
 })
}

export default useMarketsQuery
