import React from 'react'

import { usePriceInputContext } from '~/components/PriceInput/PriceInputContext'

function PriceIncrease() {
 const { increase, gap, value } = usePriceInputContext()
 return (
  <button
   className="border border-slate-500/50 bg-slate-500/10 px-3 py-1 font-bold text-[#333]"
   type="button"
   onClick={() => increase(value + gap)}
  >
   +
  </button>
 )
}

PriceIncrease.displayName = 'Price.Increase'

export default PriceIncrease
