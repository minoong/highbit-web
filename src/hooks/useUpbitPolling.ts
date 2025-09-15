import type { Market } from '~/types/apis/market'
import type { TickerSocket } from '~/types/apis/ticker.socket'
import type { Trade } from '~/types/apis/trade.socket'

import { useCallback, useEffect, useRef, useState } from 'react'

type RequestType = 'ticker' | 'orderbook' | 'trade'
type ResultInfer<T> = T extends 'ticker' ? TickerSocket : T extends 'orderbook' ? any : Trade

/**
 * Vercel 환경에서 WebSocket 대신 사용하는 폴링 기반 훅
 */
function useUpbitPolling<T extends RequestType>(marketCodes: Market[], type: T) {
 const intervalRef = useRef<NodeJS.Timeout | null>(null)
 const [isConnected, setIsConnected] = useState<boolean>(false)
 const [socketData, setSocketData] = useState<ResultInfer<T>[]>([])

 const fetchData = useCallback(async () => {
  if (marketCodes.length === 0) return

  try {
   const markets = marketCodes.map((m) => m.market).join(',')

   if (type === 'ticker') {
    const response = await fetch(`/api/upbit/v1/ticker?markets=${markets}`)
    if (response.ok) {
     const data = await response.json()
     setSocketData(
      data.map((item: any) => ({
       ...item,
       code: item.market,
      })),
     )
    }
   }
   // orderbook과 trade는 필요에 따라 추가 구현
  } catch (error) {
   console.error('Polling fetch error:', error)
  }
 }, [marketCodes, type])

 useEffect(() => {
  if (marketCodes.length === 0) {
   setIsConnected(false)
   setSocketData([])
   return
  }

  // 즉시 데이터 fetch
  fetchData()
  setIsConnected(true)

  // 주기적 폴링 시작 (ticker는 2초, 다른 데이터는 5초)
  const interval = type === 'ticker' ? 2000 : 5000
  intervalRef.current = setInterval(fetchData, interval)

  return () => {
   if (intervalRef.current) {
    clearInterval(intervalRef.current)
    intervalRef.current = null
   }
   setIsConnected(false)
   setSocketData([])
  }
 }, [marketCodes, type, fetchData])

 return {
  socket: null, // WebSocket 객체는 null
  isConnected,
  socketData,
 }
}

export default useUpbitPolling
