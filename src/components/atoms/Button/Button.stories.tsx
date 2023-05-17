import type { ComponentMeta, ComponentStory } from '@storybook/react'

import React from 'react'

import Button from '~/components/atoms/Button/Button'

export default {
 title: 'atoms/Button',
 component: Button,
 argTypes: {
  color: {
   defaultValue: 'primary',
   options: ['primary', 'secondary', 'tertiary', 'quinary'],
   control: { type: 'radio' },
  },
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
 return <Button {...args} className="text-2xl" />
}

export const Primary = Template.bind({})

Primary.args = {
 children: <a href="www.naver.com">링크</a>,
}
