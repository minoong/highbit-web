import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import Button from '~/components/atoms/Button/Button'

import '../../../app/globals.css'

export default {
 title: 'atoms/Button',
 component: Button,
 argTypes: {
  variant: {
   defaultValue: 'contained',
   options: ['text', 'contained', 'outlined'],
   control: { type: 'select' },
  },
  alignment: {
   defaultValue: 'center',
   options: ['start', 'center', 'end'],
   control: { type: 'select' },
  },
  full: { control: 'boolean', defaultValue: false },
  disabled: { control: 'boolean', defaultValue: false },
  rounded: {
   defaultValue: 'md',
   options: ['full', 'sm', 'md', 'lg', ''],
   control: { type: 'select' },
  },
 },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => {
 return <Button {...args} />
}

export const Primary = Template.bind({})

Primary.args = {
 children: '버튼',
}
