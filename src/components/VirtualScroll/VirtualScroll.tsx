import React from 'react'

interface Props {
 height: number
 itemHeight: number
 gap?: number
 children: React.ReactNode[]
 offsetY: number
 renderAhead?: number
}

function VirtualScroll(props: Props) {
 const { height, itemHeight, gap = 0, children, offsetY, renderAhead = 0 } = props

 const containerHeight = (itemHeight + gap) * children.length
 const startOffset = Math.max(Math.floor(offsetY / (itemHeight + gap)) - renderAhead, 0)
 const endOffset = Math.min(Math.ceil(height / (itemHeight + gap) + startOffset) + renderAhead, children.length)
 const translateY = Math.max((itemHeight + gap) * startOffset, gap)
 const renderJsx = children.slice(Math.max(startOffset, 0), Math.min(endOffset + 1, children.length))

 return (
  <div
   className="will-change-transform"
   style={{
    height: `${containerHeight}px`,
   }}
  >
   <div style={{ transform: `translateY(${translateY}px)` }}>{renderJsx}</div>
  </div>
 )
}

export default React.memo(VirtualScroll)
