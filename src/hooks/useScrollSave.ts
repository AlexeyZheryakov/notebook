import type { UIEvent } from "react"
import { useCallback } from "react"
import { useAppDispatch, useDebounce } from "."
import { setScrollPosition } from "../redux/scrollSave/slice"

export const useScrollSave = (pathname: string): [(...args: any[]) => void] => {
  const dispatch = useAppDispatch()

  const handleSetScrollWithDebounce = useDebounce(
    (scrollTop: number, scrollLeft: number) => {
      dispatch(
        setScrollPosition({
          positionY: scrollTop,
          positionX: scrollLeft,
          path: pathname,
        }),
      )
    },
    300,
  )

  const onScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop
      const scrollLeft = e.currentTarget.scrollLeft

      handleSetScrollWithDebounce(scrollTop, scrollLeft)
    },
    [handleSetScrollWithDebounce],
  )

  return [onScroll]
}
