import { useSession } from 'next-auth/react'
import React from 'react'

import SiginOut from '~/components/ui/Auth/SiginOut'
import SignIn from '~/components/ui/Auth/SignIn'

function Auth() {
 const { status } = useSession()
 return (
  <>
   {status === 'unauthenticated' && <SignIn />}
   {status === 'authenticated' && <SiginOut />}
  </>
 )
}

export default Auth
