import React from 'react'
import { usePriceInputContext } from '~/components/PriceInput/PriceInputContext'

function PriceInput() {
 const { value, change } = usePriceInputContext()

 return (
  <input
   type="text"
   className="flex-1 border border-slate-500/50 py-1 px-3 text-right font-bold text-[#333]"
   value={String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
   onChange={(e) => {
    const removeCommaValue = e.target.value.replace(/[^0-9]/g, '')

    if (isNaN(+removeCommaValue)) {
     change(value)
    } else {
     change(+removeCommaValue)
    }
   }}
   onKeyDown={(event) => {
    return (
     (event.key >= '0' && event.key <= '9') ||
     [37, 38, 39, 40].includes(event.keyCode) ||
     event.key === 'Backspace' ||
     event.key === 'Delete'
    )
   }}
  />
 )
}

PriceInput.displayName = 'Price.Input'

export default PriceInput
