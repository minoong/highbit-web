'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { useAppSelector } from '~/hooks'

function Modals() {
 const modals = useAppSelector((state) => state.modals.modals)

 if (typeof window === 'undefined' || modals.length === 0) return null

 return (
  <>
   <div className="fixed top-0 left-0 h-screen w-screen select-none bg-black opacity-70" />
   {createPortal(
    modals.map(({ Component, props }, idx) => <Component key={idx} {...props} />),
    document.body,
   )}
  </>
 )
}

export default React.memo(Modals)
