import { signIn } from 'next-auth/react'
import React from 'react'
import Button from '~/components/atoms/Button/Button'

function SignIn() {
 return (
  <Button
   onClick={() => signIn()}
   className="border-0 bg-transparent text-[13px] font-medium text-[#FFFFFF] hover:font-bold"
  >
   로그인
  </Button>
 )
}

export default SignIn
