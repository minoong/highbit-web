import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { IoTimeOutline } from 'react-icons/io5'

function SiginOut() {
 const { data } = useSession()
 return (
  <div className="flex items-center gap-2">
   <IoTimeOutline color="#fff" />
   <span className='after:text-[#ddd] after:content-["|"]' />
   <button type="button" onClick={() => signOut()} className="text-[13px] font-medium text-[#FFFFFF] hover:font-bold">
    로그아웃
   </button>
   <Image
    src={data?.user?.image || ''}
    width={23}
    height={23}
    alt={data?.user?.name || ''}
    className="rounded-full ring-2 ring-gray-800"
   />
  </div>
 )
}

export default SiginOut
