import StyledComponentsRegistry from '~/app/exchange/registry'
import { Counter } from '~/features/counter/Counter'
import TestButton from '~/components/TestButton'

function ExchangePage() {
 return (
  <div>
   <p>ExchangePage</p>
   <Counter />
   <StyledComponentsRegistry>
    <TestButton />
   </StyledComponentsRegistry>
  </div>
 )
}

export default ExchangePage
