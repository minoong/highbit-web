'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { useAppSelector } from '~/hooks'

function Modals() {
 const modals = useAppSelector((state) => state.modals.modals)

 if (typeof window === 'undefined') return null

 return (
  <>
   {createPortal(
    modals.map(({ Component, props }, idx) => <Component key={idx} {...props} />),
    document.body,
   )}
  </>
 )
}

export default React.memo(Modals)
