import Link from 'next/link'
import React from 'react'

interface Props {
 path: string
 matched: boolean
 children: React.ReactNode
}

function GlobalNavLink(props: Props) {
 const { path, matched, children } = props

 return (
  <Link
   href={path}
   className={`flex items-center gap-1 font-bold tracking-widest transition-all ease-out hover:text-white ${
    matched ? 'text-white' : 'text-gray-400'
   }`}
  >
   {children}
  </Link>
 )
}

export default React.memo(GlobalNavLink)
