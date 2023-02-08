import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import GlobalNav from '~/components/GlobalNav/GlobalNav'

import '../../app/globals.css'

export default {
 title: 'components/GlobalNav',
 component: GlobalNav,
} as ComponentMeta<typeof GlobalNav>

const Template: ComponentStory<typeof GlobalNav> = () => <GlobalNav />

export const Primary = Template.bind({})
Primary.args = {}
