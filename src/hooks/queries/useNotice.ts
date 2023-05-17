import type { NoticeResponse } from '~/types/apis/notice'
import type { UniversalUseQueryOptions } from '~/types/react-query/universal'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { useAppSelector } from '~/hooks/useAppSelector'

async function getNotice(offset: number) {
 const { data } = await axios.get<NoticeResponse[]>(
  `https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=5`,
 )

 return data
}

type GetNotice = typeof getNotice

export function useNotice<T = GetNotice>(options: UniversalUseQueryOptions<GetNotice, T> = {}) {
 const { offset } = useAppSelector((state) => state.notice)

 return useQuery(['notice', offset], () => getNotice(offset), {
  ...options,
 })
}
