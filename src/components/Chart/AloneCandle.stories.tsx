/* eslint-disable react/destructuring-assignment */
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import AloneCandle from '~/components/Chart/AloneCandle'

export default {
 title: 'atoms/AloneCandle',
 component: AloneCandle,
 argTypes: {
  width: { control: { type: 'range', min: 1, max: 100, step: 3 } },
  height: { control: { type: 'range', min: 1, max: 300, step: 3 } },
  change: {
   options: ['FALL', 'RISE'],
   control: { type: 'radio' },
  },
 },
} as ComponentMeta<typeof AloneCandle>

const Template: ComponentStory<typeof AloneCandle> = (args) => (
 <div>
  <svg width={args.width} height={args.height} style={{ backgroundColor: '#e8e8e8' }}>
   <AloneCandle {...args} />
  </svg>
 </div>
)

export const Primary = Template.bind({})
Primary.args = {
 width: 20,
 height: 60,
 change: 'FALL',
 data: {
  opening: 600,
  trade: 500,
  high: 700,
  low: 300,
 },
}
