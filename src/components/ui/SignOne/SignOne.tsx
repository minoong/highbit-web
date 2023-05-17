'use client'

import { signIn } from 'next-auth/react'
import React from 'react'

import Button from '~/components/atoms/Button/Button'

function SignOne() {
 const handleSignIn = () => {
  signIn()
 }

 return (
  <div className="grid grid-cols-3 gap-2 font-bold text-white">
   <div>
    <Button color="secondary" className="w-full py-3 hover:underline" onClick={handleSignIn}>
     회원가입
    </Button>
   </div>
   <div className="col-span-2">
    <Button color="primary" full className="py-3 hover:underline" onClick={handleSignIn}>
     로그인
    </Button>
   </div>
  </div>
 )
}

export default React.memo(SignOne)
