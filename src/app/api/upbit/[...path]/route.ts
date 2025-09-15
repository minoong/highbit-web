import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

import { upbitRateLimiter } from '~/utils/rateLimiter'

const UPBIT_API_BASE = 'https://api.upbit.com'

// 캐시 설정을 위한 헬퍼 함수
const getCacheControl = (path: string) => {
 // 실시간 데이터는 짧은 캐시, 정적 데이터는 긴 캐시
 if (path.includes('/ticker') || path.includes('/trades') || path.includes('/orderbook')) {
  return 'public, max-age=1, s-maxage=1' // 1초 캐시
 }
 if (path.includes('/market/all') || path.includes('/candles')) {
  return 'public, max-age=30, s-maxage=30' // 30초 캐시
 }
 return 'public, max-age=10, s-maxage=10' // 기본 10초 캐시
}

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
 try {
  const { path } = params
  const searchParams = request.nextUrl.searchParams

  // URL 경로 구성
  const apiPath = `/${path.join('/')}`
  const queryString = searchParams.toString()
  const fullUrl = `${UPBIT_API_BASE}${apiPath}${queryString ? `?${queryString}` : ''}`

  // Rate limiter를 통해 요청 실행
  const data = await upbitRateLimiter.throttle(async () => {
   const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
     Accept: 'application/json',
     'User-Agent': 'highbit-web/1.0',
     'Accept-Encoding': 'gzip, deflate',
    },
    // Next.js의 fetch cache 설정
    next: {
     revalidate: path.includes('ticker') ? 1 : 10, // ticker는 1초, 나머지는 10초
    },
   })

   if (!response.ok) {
    if (response.status === 429) {
     throw new Error('Rate limit exceeded from Upbit API')
    }

    throw new Error(`Upbit API error: ${response.status} ${response.statusText}`)
   }

   return response.json()
  })

  // 성공 응답
  const response = NextResponse.json(data)

  // 캐시 헤더 설정
  response.headers.set('Cache-Control', getCacheControl(apiPath))
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

  return response
 } catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'
  const statusCode = errorMessage.includes('Rate limit') ? 429 : 500

  return NextResponse.json(
   {
    error: 'Proxy request failed',
    message: errorMessage,
    timestamp: new Date().toISOString(),
   },
   { status: statusCode },
  )
 }
}

// OPTIONS 메서드 처리 (CORS preflight)
export async function OPTIONS() {
 return new NextResponse(null, {
  status: 200,
  headers: {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Methods': 'GET, OPTIONS',
   'Access-Control-Allow-Headers': 'Content-Type',
  },
 })
}
