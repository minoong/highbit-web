import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import BuyGroupButton from '~/components/BuyGroupButton/BuyGroupButton'
import { PriceGroup } from '~/components/PriceInput/PriceGroup'
import SignOne from '~/components/ui/SignOne/SignOne'
import { symbolWithCurrencySelector } from '~/features/marketInfo/marketInfoSlice'
import { useAppSelector } from '~/hooks'

function Buy() {
 const { status } = useSession()
 const currencyMoney = useAppSelector((state) => state.wallet.currencyMoney)
 const [symbol, currency] = useAppSelector(symbolWithCurrencySelector)

 const [count, setCount] = useState<number>(0)

 return (
  <div className="flex h-[432px] w-full flex-col gap-2 p-3">
   <div className="grid grid-cols-3 gap-y-2">
    <div className="text-sm font-semibold text-[#666666]">주문가능</div>
    <div className="col-span-2 items-end text-right">
     <div className="font-semibold">
      {currencyMoney.toLocaleString()}
      <span className="pl-1 text-[7px] font-semibold text-[#666666]">{symbol}</span>
     </div>
    </div>
    <div className="text-sm font-semibold text-[#666666]">매수가격{symbol}</div>
    <div className="col-span-2">
     <PriceGroup.Group
      value={count}
      gap={1000}
      increase={(value) => setCount(value)}
      decrease={(value) => setCount(value)}
      change={(e) => {
       setCount(e)
      }}
     >
      <PriceGroup.Input />
      <PriceGroup.Decrease />
      <PriceGroup.Increase />
     </PriceGroup.Group>
    </div>
    <div className="text-sm font-semibold text-[#666666]">주문수량{currency}</div>
    <div className="col-span-2">
     <PriceGroup.Group
      value={count}
      gap={1000}
      increase={(value) => setCount(value)}
      decrease={(value) => setCount(value)}
      change={(e) => {
       setCount(e)
      }}
     >
      <PriceGroup.Input />
     </PriceGroup.Group>
    </div>
    <div className="text-sm font-semibold text-[#666666]">주문총액{symbol}</div>
    <div className="col-span-2">
     <PriceGroup.Group
      value={count}
      gap={1000}
      increase={(value) => setCount(value)}
      decrease={(value) => setCount(value)}
      change={(e) => {
       setCount(e)
      }}
     >
      <PriceGroup.Input />
     </PriceGroup.Group>
    </div>
   </div>

   <div className="flex-1" />

   {status !== 'authenticated' ? (
    <SignOne />
   ) : (
    <BuyGroupButton type="buy" onInitClick={console.log} onSubmitClick={console.log} />
   )}
  </div>
 )
}

export default Buy
