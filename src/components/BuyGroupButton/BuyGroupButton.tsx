import React from 'react'

import Button from '~/components/atoms/Button/Button'

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
    <Button color="quinary" full className="py-3 hover:underline" onClick={onInitClick}>
     초기화
    </Button>
   </div>
   <div className="col-span-2">
    <Button full className={`w-full ${typeColor} py-3 hover:underline`} onClick={onSubmitClick}>
     {type === 'buy' ? '매수' : '매도'}
    </Button>
   </div>
  </div>
 )
}

export default React.memo(BuyGroupButton)
