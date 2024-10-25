import type { MutableRefObject } from "react"
import { useEffect } from "react"

export interface UseInfiniteScrollArgs {
  callback?: () => void
  triggerRef: MutableRefObject<HTMLDivElement> | null
  wrapperRef: MutableRefObject<HTMLDivElement> | null
}

export function useInfiniteScroll(args: UseInfiniteScrollArgs) {
  const { callback, triggerRef, wrapperRef } = args

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    const wrapperElement = wrapperRef?.current
    const triggerElement = triggerRef?.current

    if (callback && wrapperElement && triggerElement) {
      const options = {
        root: wrapperRef?.current,
        rootMargin: "0px",
        threshold: 1.0,
      }

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      }, options)

      observer.observe(triggerElement)
    }

    return () => {
      if (observer && triggerElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerElement)
      }
    }
  }, [callback, triggerRef, wrapperRef])
}
