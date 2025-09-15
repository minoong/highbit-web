/**
 * Rate limiter for API requests to prevent 429 errors
 */
class RateLimiter {
 private lastRequestTime = 0
 private requestQueue: Array<() => void> = []
 private isProcessing = false

 constructor(private minInterval: number = 100) {}

 /**
  * 요청을 큐에 추가하고 처리 대기
  */
 async throttle<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
   this.requestQueue.push(async () => {
    try {
     const result = await this.executeWithDelay(fn)
     resolve(result)
    } catch (error) {
     reject(error)
    }
   })

   this.processQueue()
  })
 }

 /**
  * 최소 간격을 지키며 요청 실행
  */
 private async executeWithDelay<T>(fn: () => Promise<T>): Promise<T> {
  const now = Date.now()
  const timeSinceLastRequest = now - this.lastRequestTime

  if (timeSinceLastRequest < this.minInterval) {
   const delay = this.minInterval - timeSinceLastRequest
   await this.sleep(delay)
  }

  this.lastRequestTime = Date.now()
  return await fn()
 }

 /**
  * 요청 큐 처리
  */
 private async processQueue() {
  if (this.isProcessing || this.requestQueue.length === 0) {
   return
  }

  this.isProcessing = true

  while (this.requestQueue.length > 0) {
   const request = this.requestQueue.shift()
   if (request) {
    await request()
   }
  }

  this.isProcessing = false
 }

 /**
  * 지정된 시간만큼 대기
  */
 private sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
 }

 /**
  * 큐 상태 조회
  */
 getQueueStatus() {
  return {
   queueLength: this.requestQueue.length,
   isProcessing: this.isProcessing,
   lastRequestTime: this.lastRequestTime,
  }
 }
}

// Upbit API용 전역 rate limiter 인스턴스
export const upbitRateLimiter = new RateLimiter(100) // 100ms 간격

// 다른 API용 rate limiter 생성 함수
export const createRateLimiter = (minInterval = 100) => {
 return new RateLimiter(minInterval)
}

export default RateLimiter
