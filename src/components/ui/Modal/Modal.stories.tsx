import type { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import { Provider } from 'react-redux'
import Modal from '~/components/ui/Modal/Modal'
import { store } from '~/store/store'

export default {
 title: 'components/Modal',
 component: Modal,
 decorators: [
  (Story): JSX.Element => (
   <Provider store={store}>
    <>
     배경
     <div className="fixed top-0 left-0 h-screen w-screen select-none bg-black opacity-70" />
     <Story />
    </>
   </Provider>
  ),
 ],
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Primary = Template.bind({})
Primary.args = {
 title: '제목',
 contents: <div className="h-96">컨텐츠</div>,
 footer: (
  <div className="flex w-full justify-end gap-1">
   <button className="rounded-sm bg-white px-3 text-blue-700/90 ring-1 ring-blue-700/90">취소</button>
   <button className="rounded-sm bg-blue-700/90 px-3 text-white ring-1 ring-blue-700/90">로그인</button>
  </div>
 ),
}
