import type { MutableRefObject } from "react"
import { useEffect, useState } from "react"

export const useDetectPosition = (
  ref: MutableRefObject<HTMLElement>["current"] | null,
) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    if (ref) {
      const updatePosition = () => {
        setScrollPosition(ref.scrollTop)
      }

      ref.addEventListener("scroll", updatePosition)

      return () => ref.removeEventListener("scroll", updatePosition)
    }
  }, [ref])
  return scrollPosition
}
