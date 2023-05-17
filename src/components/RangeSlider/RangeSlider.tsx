import React, { useRef, useState } from 'react'

import dragDropHelper from '~/utils/dragDropHelper'

interface Props {
 change?: (value: number) => void
}

function RangeSlider(props: Props) {
 const { change } = props
 const ref = useRef<HTMLDivElement>(null)
 const [value, setValue] = useState<number>(1)
 const [position, setPosistion] = useState<number>(1)

 const left = `${(position - 28).toFixed(0)}px`
 const w = `${value.toFixed(0)}%`

 return (
  <div
   ref={ref}
   className="relative w-full bg-gray-200"
   {...dragDropHelper({
    onDragChange: (deltaX, _, ev) => {
     if (ref.current) {
      const x = ref.current.getBoundingClientRect()
      if ('touches' in ev) {
      } else {
       if (((ev.pageX + deltaX) / x.width) * 100 > 100 || ((ev.pageX + deltaX) / x.width) * 100 <= 1) {
        return
       }
       setValue(((ev.pageX + deltaX) / x.width) * 100)
       setPosistion(ev.pageX + deltaX)
       change?.(((ev.pageX + deltaX) / x.width) * 100)
      }
     }
    },
   })}
  >
   <div className="pointer-events-none h-2">
    <div className={`h-full rounded-md bg-blue-700`} style={{ width: w }}></div>
   </div>
   <div className={`pointer-events-none absolute top-3 w-10 rounded-md bg-blue-600`} style={{ left }}>
    <div className="w-full text-center text-xs  text-white">{value.toFixed(0)}%</div>
   </div>
  </div>
 )
}

export default React.memo(RangeSlider)
