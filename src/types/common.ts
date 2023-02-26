// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any

export type Candle<T = number> = {
 close: number
 date: T
 high: number
 low: number
 open: number
 volume: number
}
