'use client'

import type { Session } from 'next-auth'
import { SessionProvider as Provider } from 'next-auth/react'

type Props = {
 children: React.ReactNode
 session: Session | null
}

export default function SessionProvider(props: Props) {
 const { children, session } = props
 return <Provider session={session}>{children}</Provider>
}
