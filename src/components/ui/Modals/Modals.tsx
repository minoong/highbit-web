'use client'

import React from 'react'
import { createPortal } from 'react-dom'

import { useAppSelector } from '~/hooks'

function Modals() {
 const modals = useAppSelector((state) => state.modals.modals)

 if (typeof window === 'undefined' || modals.length === 0) return null

 return (
  <>
   <div className="fixed left-0 top-0 z-40 h-screen w-screen select-none bg-black opacity-70" />
   {createPortal(
    modals.map(({ Component, props }, idx) => <Component key={idx} {...props} />),
    document.body,
   )}
  </>
 )
}

export default React.memo(Modals)
