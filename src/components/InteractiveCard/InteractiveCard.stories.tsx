/* eslint-disable react/destructuring-assignment */
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import InteractiveCard from '~/components/InteractiveCard/InteractiveCard'

export default {
 title: 'atoms/InteractiveCard',
 component: InteractiveCard,
} as ComponentMeta<typeof InteractiveCard>

const Template: ComponentStory<typeof InteractiveCard> = (args) => <InteractiveCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
 children: <div className="text-xl font-bold text-emerald-800">hihihi</div>,
}
