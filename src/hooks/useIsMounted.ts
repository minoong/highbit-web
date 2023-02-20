import { useCallback, useEffect, useRef } from 'react'

function useIsMounted() {
 const isMounted = useRef<boolean>(false)

 useEffect(() => {
  isMounted.current = true

  return () => {
   isMounted.current = false
  }
 }, [])

 return useCallback(() => isMounted.current, [])
}

export default useIsMounted
