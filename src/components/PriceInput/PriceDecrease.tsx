import React from 'react'

import { usePriceInputContext } from '~/components/PriceInput/PriceInputContext'

function PriceDecrease() {
 const { decrease, gap, value } = usePriceInputContext()
 return (
  <button
   className="border border-slate-500/50 bg-slate-500/10 px-3 py-1 font-bold text-[#333]"
   type="button"
   onClick={() => decrease(Math.max(value - gap, 0))}
  >
   -
  </button>
 )
}

PriceDecrease.displayName = 'Price.Decrease'

export default PriceDecrease
