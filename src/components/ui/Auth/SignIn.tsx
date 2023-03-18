import { signIn } from 'next-auth/react'
import React from 'react'

function SignIn() {
 return (
  <button type="button" onClick={() => signIn()} className="text-[13px] font-medium text-[#FFFFFF] hover:font-bold">
   로그인
  </button>
 )
}

export default SignIn
