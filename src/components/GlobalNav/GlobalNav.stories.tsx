import type { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import { Provider } from 'react-redux'
import GlobalNav from '~/components/GlobalNav/GlobalNav'
import { store } from '~/store/store'

import '../../app/globals.css'

export default {
 title: 'components/GlobalNav',
 component: GlobalNav,
 decorators: [
  (Story): JSX.Element => (
   <Provider store={store}>
    <Story />
   </Provider>
  ),
 ],
} as ComponentMeta<typeof GlobalNav>

const Template: ComponentStory<typeof GlobalNav> = () => <GlobalNav />

export const Primary = Template.bind({})
Primary.args = {}
