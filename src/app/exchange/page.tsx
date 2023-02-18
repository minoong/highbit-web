import { Suspense } from 'react'
import StyledComponentsRegistry from '~/app/exchange/registry'
import { Counter } from '~/features/counter/Counter'
import TestButton from '~/components/TestButton'

function ExchangePage() {
 return (
  <div>
   <p>ExchangePage</p>
   <Counter />
   <StyledComponentsRegistry>
    <Suspense fallback={<div>Loading...</div>}>
     <TestButton />
    </Suspense>
   </StyledComponentsRegistry>
  </div>
 )
}

export default ExchangePage
