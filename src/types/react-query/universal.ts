import type { UseQueryOptions } from '@tanstack/react-query'
import type { Any } from '~/types/common'

export type UniversalUseQueryOptions<T extends (...args: Any[]) => Any, T2 = T> = Omit<
 UseQueryOptions<Awaited<ReturnType<T>>, Any, T2 extends (...args: Any[]) => Any ? Awaited<ReturnType<T2>> : T2, Any[]>,
 'queryKey' | 'queryFn'
>
