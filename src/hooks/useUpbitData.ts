import type { Market } from '~/types/apis/market'

import useUpbit from './useUpbit.websocket'
import useUpbitPolling from './useUpbitPolling'

type RequestType = 'ticker' | 'orderbook' | 'trade'

/**
 * 환경에 따라 WebSocket 또는 폴링을 자동 선택하는 훅
 */
function useUpbitData<T extends RequestType>(marketCodes: Market[], type: T) {
 // 환경 감지
 const isProduction = process.env.NODE_ENV === 'production'
 const isVercel = process.env.VERCEL === '1'
 const shouldUsePolling = isProduction && isVercel

 // 조건부로 훅 선택
 const websocketResult = useUpbit(marketCodes, type)
 const pollingResult = useUpbitPolling(marketCodes, type)

 if (shouldUsePolling) {
  return pollingResult
 }

 return websocketResult
}

export default useUpbitData
