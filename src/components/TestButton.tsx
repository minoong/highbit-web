'use client'

import { useState } from 'react'
import { styled } from 'styled-components'

const Blocked = styled.div`
 color: red;
`

function TestButton() {
 const [count, setCount] = useState(0)
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
   </div>
  </Blocked>
 )
}

export default TestButton
