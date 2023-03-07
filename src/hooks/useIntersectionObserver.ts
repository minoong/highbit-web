/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef, useState } from 'react'

type ObserverInstanceCallback = (inView: boolean, entry: IntersectionObserverEntry) => void

interface IntersectionOptions extends IntersectionObserverInit {
 root?: Element | null
 rootMargin?: string
 threshold?: number | number[]
 triggerOnce?: boolean
 skip?: boolean
 initialInView?: boolean
 fallbackInView?: boolean
 trackVisibility?: boolean
 delay?: number
 onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void
}

type InViewHookResponse = {
 ref: React.Dispatch<React.SetStateAction<Element | null>>
 inView: boolean
 entry?: IntersectionObserverEntry
}

type State = {
 inView: boolean
 entry?: IntersectionObserverEntry
}

const observerMap = new Map<
 string,
 {
  id: string
  observer: IntersectionObserver
  elements: Map<Element, Array<ObserverInstanceCallback>>
 }
>()

const RootIds: WeakMap<Element | Document, string> = new WeakMap()

let rootId = 0
let unsupportedValue: boolean | undefined

function getRootId(root: IntersectionObserverInit['root']) {
 if (!root) {
  return '0'
 }
 if (RootIds.has(root)) {
  return RootIds.get(root)
 }
 rootId += 1
 RootIds.set(root, rootId.toString())

 return RootIds.get(root)
}

function optionsToId(options: IntersectionObserverInit) {
 return Object.keys(options)
  .sort()
  .filter((key) => options[key as keyof IntersectionObserverInit] !== undefined)
  .map((key) => `${key}_${key === 'root' ? getRootId(options.root) : options[key as keyof IntersectionObserverInit]}`)
  .toString()
}

function createObserver(options: IntersectionObserverInit) {
 const id = optionsToId(options)
 let instance = observerMap.get(id)

 if (!instance) {
  const elements = new Map<Element, Array<ObserverInstanceCallback>>()
  // eslint-disable-next-line prefer-const
  let thresholds: number[] | readonly number[]
  const observer = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
    const inView = entry.isIntersecting && thresholds.some((threshold) => entry.intersectionRatio >= threshold)
    // @ts-ignore
    if (options.trackVisibility && typeof entry.isVisible === 'undefined') {
     // @ts-ignore
     entry.isVisible = inView
    }

    elements.get(entry.target)?.forEach((callback) => callback(inView, entry))
   })
  }, options)

  thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0])

  instance = {
   id,
   observer,
   elements,
  }

  observerMap.set(id, instance)
 }

 return instance
}

function observe(
 element: Element,
 callback: ObserverInstanceCallback,
 options: IntersectionObserverInit = {},
 fallbackInView = unsupportedValue,
) {
 if (typeof window.IntersectionObserver === 'undefined' && fallbackInView !== undefined) {
  const bounds = element.getBoundingClientRect()
  callback(fallbackInView, {
   isIntersecting: fallbackInView,
   target: element,
   intersectionRatio: typeof options.threshold === 'number' ? options.threshold : 0,
   time: 0,
   boundingClientRect: bounds,
   intersectionRect: bounds,
   rootBounds: bounds,
  })
  return () => {
   // Nothing to cleanup
  }
 }

 const { id, observer, elements } = createObserver(options)

 const callbacks = elements.get(element) || []
 if (!elements.has(element)) {
  elements.set(element, callbacks)
 }

 callbacks.push(callback)
 observer.observe(element)

 return function unobserve() {
  callbacks.splice(callbacks.indexOf(callback), 1)

  if (callbacks.length === 0) {
   elements.delete(element)
   observer.unobserve(element)
  }

  if (elements.size === 0) {
   observer.disconnect()
   observerMap.delete(id)
  }
 }
}

function useIntersectionObserver(props: IntersectionOptions = {}): InViewHookResponse {
 const {
  threshold,
  delay,
  trackVisibility,
  rootMargin,
  root,
  triggerOnce,
  skip,
  initialInView,
  fallbackInView,
  onChange,
 } = props

 const [ref, setRef] = useState<Element | null>(null)
 const callback = useRef<IntersectionOptions['onChange']>()
 const [state, setState] = useState<State>({ inView: !!initialInView, entry: undefined })

 useEffect(() => {
  callback.current = onChange
 }, [onChange])

 useEffect(() => {
  if (skip || !ref) return

  let unobserve: (() => void) | undefined

  unobserve = observe(
   ref,
   (inView, entry) => {
    setState({
     inView,
     entry,
    })

    if (callback.current) callback.current(inView, entry)

    if (entry.isIntersecting && triggerOnce && unobserve) {
     unobserve()
     unobserve = undefined
    }
   },
   {
    root,
    rootMargin,
    threshold,
    // @ts-ignore
    trackVisibility,
    delay,
   },
   fallbackInView,
  )

  return () => {
   if (unobserve) {
    unobserve()
   }
  }
 }, [ref, root, rootMargin, triggerOnce, skip, trackVisibility, fallbackInView, delay, threshold])

 const entryTarget = state.entry?.target

 useEffect(() => {
  if (!ref && entryTarget && !triggerOnce && !skip) {
   setState({
    inView: !!initialInView,
    entry: undefined,
   })
  }
 }, [ref, entryTarget, triggerOnce, skip, initialInView])

 return {
  ref: setRef,
  inView: state.inView,
  entry: state.entry,
 }
}

export default useIntersectionObserver
