import type { ComponentMeta } from '@storybook/react'

import React, { useState } from 'react'

import { PriceGroup } from '~/components/PriceInput/PriceGroup'

import '../../app/globals.css'

export default {
 title: 'components/PriceGroup',
 component: PriceGroup.Group,
} as ComponentMeta<typeof PriceGroup.Group>

const Template = () => {
 const [count, setCount] = useState<number>(50000)
 return (
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
 )
}

export const Primary = Template.bind({})
