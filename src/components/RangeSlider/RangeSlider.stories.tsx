import type { ComponentMeta, ComponentStory } from '@storybook/react'

import React from 'react'

import RangeSlider from '~/components/RangeSlider/RangeSlider'

import '../../app/globals.css'

export default {
 title: 'components/RangeSlider',
 component: RangeSlider,
} as ComponentMeta<typeof RangeSlider>

const Template: ComponentStory<typeof RangeSlider> = (args) => <RangeSlider {...args} />

export const Primary = Template.bind({})

Primary.args = {
 change: (value) => console.log(value),
}
