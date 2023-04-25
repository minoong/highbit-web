'use client'

import { signIn } from 'next-auth/react'
import React from 'react'

function SignOne() {
 const handleSignIn = () => {
  signIn()
 }

 return (
  <div className="grid grid-cols-3 gap-2 font-bold text-white">
   <div>
    <button type="button" className="w-full bg-[#0D3887] py-3 hover:underline" onClick={handleSignIn}>
     회원가입
    </button>
   </div>
   <div className="col-span-2">
    <button type="button" className="w-full bg-[#1161C3] py-3 hover:underline" onClick={handleSignIn}>
     로그인
    </button>
   </div>
  </div>
 )
}

export default React.memo(SignOne)
