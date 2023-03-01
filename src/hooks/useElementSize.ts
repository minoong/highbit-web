import type { Any } from '~/types/common'
import { useCallback, useEffect, useRef, useState } from 'react'

function useElementSize<T extends HTMLElement = Any>(callback?: (entry: DOMRect) => void) {
 const frameId = useRef<number>(0)
 const targetRef = useRef<T>(null)
 const [width, setWidth] = useState<number>(0)
 const [height, setHeight] = useState<number>(0)

 const handleResize = useCallback(
  (entries: ResizeObserverEntry[]) => {
   if (!Array.isArray(entries)) {
    return
   }

   const entry = entries[0]

   if (entry) {
    cancelAnimationFrame(frameId.current)

    frameId.current = requestAnimationFrame(() => {
     const { width, height } = entry.contentRect

     setWidth(width)
     setHeight(height)

     if (callback) {
      callback(entry.target.getBoundingClientRect())
     }
    })
   }
  },
  [callback],
 )

 useEffect(() => {
  if (!targetRef.current) {
   return
  }

  const ro = new ResizeObserver((entries) => handleResize(entries))

  ro.observe(targetRef.current)

  return () => {
   ro.disconnect()

   if (frameId.current) {
    cancelAnimationFrame(frameId.current)
   }
  }
 }, [handleResize, targetRef])

 return { targetRef, width, height }
}

export default useElementSize
