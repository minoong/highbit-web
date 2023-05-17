'use client'

import { Provider } from 'react-redux'

import { store } from '~/store/store'

type Props = {
 children: React.ReactNode
}

function ReduxProvider(props: Props) {
 const { children } = props
 return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
