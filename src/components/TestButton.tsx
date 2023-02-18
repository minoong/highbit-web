'use client'

import { useState } from 'react'
import { styled } from 'styled-components'
import { marketsInvoke } from '~/features/markets/marketsSlice'
import { useAppDispatch, useAppSelector } from '~/hooks'
import useMarketsQuery from '~/hooks/queries/useMarketsQuery'

const Blocked = styled.div`
 color: red;
`

function TestButton() {
 const dispatch = useAppDispatch()

 const [count, setCount] = useState(0)
 const markets = useAppSelector((state) => state.markets.markets)

 useMarketsQuery({
  suspense: true,
  onSuccess: (data) => {
   dispatch(marketsInvoke(data))
  },
 })

 return (
  <Blocked>
   TestButton #{count}
   <div>
    <button type="button" onClick={() => setCount((prev) => prev + 1)}>
     +1
    </button>
    <button type="button" onClick={() => setCount((prev) => prev - 1)}>
     -1
    </button>
    {JSON.stringify(markets)}
   </div>
  </Blocked>
 )
}

export default TestButton
