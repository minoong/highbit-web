const isTouchScreen = typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches

export default function dragDropHelper({
 onDragChange,
 onDragEnd,
 stopPropagation,
}: {
 onDragChange?: (deltaX: number, deltaY: number) => void
 onDragEnd?: (deltaX: number, deltaY: number) => void
 stopPropagation?: boolean
}) {
 if (isTouchScreen) {
  return {
   onTouchStart: (touchEvent: React.TouchEvent<HTMLElement>) => {
    if (stopPropagation) {
     touchEvent.stopPropagation()
    }

    const touchMoveHandler = (moveEvent: TouchEvent) => {
     if (moveEvent.cancelable) {
      moveEvent.preventDefault()
     }

     const { deltaX, deltaY } = getDeltaAxis(touchEvent.touches[0], moveEvent.touches[0])

     onDragEnd?.(deltaX, deltaY)
    }

    const touchEndHandler = (moveEvent: TouchEvent) => {
     const { deltaX, deltaY } = getDeltaAxis(touchEvent.touches[0], moveEvent.touches[0])

     onDragEnd?.(deltaX, deltaY)

     document.addEventListener('touchmove', touchMoveHandler)
    }

    document.addEventListener('touchmove', touchMoveHandler, { passive: false })
    document.addEventListener('touchend', touchEndHandler, { once: true })
   },
  }
 }

 return {
  onMouseDown: (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
   if (stopPropagation) {
    clickEvent.stopPropagation()
   }

   const mouseMoveHandler = (mouseEvent: MouseEvent) => {
    const { deltaX, deltaY } = getDeltaAxis(clickEvent, mouseEvent)

    onDragChange?.(deltaX, deltaY)
   }

   const mouseUpHandler = (mouseEvent: MouseEvent) => {
    const { deltaX, deltaY } = getDeltaAxis(clickEvent, mouseEvent)

    onDragEnd?.(deltaX, deltaY)

    document.removeEventListener('mousemove', mouseMoveHandler)
   }

   document.addEventListener('mousemove', mouseMoveHandler)
   document.addEventListener('mouseup', mouseUpHandler, { once: true })
  },
 }
}

function getDeltaAxis(
 startingPoint: { pageX: number; pageY: number },
 changingPoint: { pageX: number; pageY: number },
) {
 const deltaX = changingPoint.pageX - startingPoint.pageX
 const deltaY = changingPoint.pageY - startingPoint.pageY

 return { deltaX, deltaY }
}
