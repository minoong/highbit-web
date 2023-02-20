import type { Change } from '~/types/apis/common'
import React, { useEffect, useState } from 'react'
import useIsMounted from '~/hooks/useIsMounted'
import usePrevious from '~/hooks/usePrevious'
import { MarketUtils } from '~/utils/marketUtils'

interface Props {
 tradePrice: number
 previousChnage: Change
}

function Price(props: Props) {
 const { tradePrice, previousChnage } = props

 const [currentChange, setCurrentChange] = useState<Change>('EVEN')
 const previousTradePrice = usePrevious(tradePrice)
 const isMounted = useIsMounted()

 useEffect(() => {
  if (previousTradePrice !== tradePrice) {
   setCurrentChange(tradePrice > previousTradePrice ? 'RISE' : tradePrice < previousTradePrice ? 'FALL' : 'EVEN')
  }
  const id = setTimeout(() => {
   setCurrentChange('EVEN')
  }, 300)

  return () => clearTimeout(id)
 }, [tradePrice, previousTradePrice])

 const change = MarketUtils.getChageColor('text-', previousChnage, '[#333333]')
 const highlight = MarketUtils.getChageColor('border border-', currentChange)

 return (
  <div
   className={`${change} transition-all ease-in ${
    isMounted() ? highlight : ''
   } flex h-10 justify-end pr-2 pt-1 text-xs font-semibold`}
  >
   {MarketUtils.getPricePretty(tradePrice)}
  </div>
 )
}

export default React.memo(Price)
