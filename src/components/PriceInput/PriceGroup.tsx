import type { PriceInputContextType } from '~/components/PriceInput/PriceInputContext'
import type { PropsWithChildren } from 'react'
import React from 'react'
import PriceDecrease from '~/components/PriceInput/PriceDecrease'
import PriceIncrease from '~/components/PriceInput/PriceIncrease'
import PriceInput from '~/components/PriceInput/PriceInput'
import { PriceInputContext } from '~/components/PriceInput/PriceInputContext'

export type Props = PropsWithChildren & PriceInputContextType

function PriceComponent(props: Props) {
 const { value, gap, change, increase, decrease, children } = props
 return (
  <div className="flex w-full items-center">
   <PriceInputContext.Provider value={{ value, gap, change, increase, decrease }}>
    {children}
   </PriceInputContext.Provider>
  </div>
 )
}

export const PriceGroup = { Group: PriceComponent, Input: PriceInput, Increase: PriceIncrease, Decrease: PriceDecrease }
