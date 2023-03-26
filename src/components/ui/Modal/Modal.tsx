import React from 'react'

interface Props {
 title: React.ReactNode
 contents: React.ReactNode
 footer?: React.ReactNode
 width?: number
 height?: number
}

function Modal(props: Props) {
 const { title, contents, footer, width = 250, height = 180 } = props

 const w = `w-[${width}px]`
 const h = `h-[${height}px]`

 return (
  <div
   className={`fixed top-1/2 left-1/2 z-50 flex min-h-[180px] min-w-[350px] -translate-y-1/2 -translate-x-1/2 bg-white ${w} ${h}`}
  >
   <section className="flex w-full flex-col gap-2 p-3">
    <header className="flex">{title}</header>
    <div className="grow">{contents}</div>
    <footer className="flex">{footer}</footer>
   </section>
  </div>
 )
}

export default React.memo(Modal)
