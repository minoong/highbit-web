import React from 'react'

interface Props {
 type: 'buy' | 'cell'
 onInitClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
 onSubmitClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function BuyGroupButton(props: Props) {
 const { type, onInitClick, onSubmitClick } = props

 const typeColor = type === 'buy' ? 'bg-trade-rise' : 'bg-trade-fall'

 return (
  <div className="grid grid-cols-3 gap-2 font-bold text-white">
   <div>
    <button type="button" className="w-full bg-[#95959E] py-3 hover:underline" onClick={onInitClick}>
     초기화
    </button>
   </div>
   <div className="col-span-2">
    <button type="button" className={`w-full ${typeColor} py-3 hover:underline`} onClick={onSubmitClick}>
     {type === 'buy' ? '매수' : '매도'}
    </button>
   </div>
  </div>
 )
}

export default React.memo(BuyGroupButton)
