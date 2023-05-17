import type { Change } from '~/types/apis/common'

import classnames from 'classnames'
import dayjs from 'dayjs'

export const MarketUtils = {
 numberToHuman: function numberToHuman(volume: number | string) {
  const num = +volume
  const unitWords = ['', '백만']
  const splitUnit = 1000000
  const splitCount = unitWords.length

  const resultArray: number[] = []
  let resultString: string[] = []

  for (let i = 0; i < splitCount; i += 1) {
   const unitRound = splitUnit ** (i + 1)
   const splitPhase = splitUnit ** i
   const unitResult = Math.floor((num % unitRound) / splitPhase)

   if (unitResult > 0) {
    resultArray[i] = unitResult
   }

   for (let i = 0, len = resultArray.length; i < len; i += 1) {
    if (resultArray[i]) {
     resultString = [String(resultArray[i].toLocaleString()), unitWords[i]]
    }
   }
  }

  return resultString
 },
 getPricePretty: function getPricePretty(price: number) {
  if (!Number.isInteger(price) && price < 1) return String(price)
  return price < 100 ? price.toFixed(2).toLocaleString() : price.toLocaleString()
 },
 getChageColor: function getChageColor(prefix: string, change: Change, evenColor = 'transparent') {
  // eslint-disable-next-line tailwindcss/no-custom-classname
  return `${prefix}${classnames(
   change === 'RISE' && 'trade-rise',
   change === 'FALL' && 'trade-fall',
   change === 'EVEN' && evenColor,
  )}`
 },
 getDailyRageTimes: function getDailyRageTimes() {
  const result = []
  const currentTime = dayjs()
  const marketOpenTime = dayjs().set('hour', 9).set('minute', 0).set('second', 0).set('millisecond', 0)

  let gap = currentTime.diff(marketOpenTime, 'minute')
  let repeat = 1

  while (gap > 0) {
   if (gap >= 200) {
    gap -= 200
    result.push([marketOpenTime.add(200 * repeat, 'minute'), 200] as const)
    repeat++
   } else {
    result.push([marketOpenTime.add(200 * (repeat - 1) + gap, 'minute'), gap] as const)
    gap -= gap
   }
  }

  return result.map(([time, count]) => ({ time: time.toISOString(), count }))
 },
}
