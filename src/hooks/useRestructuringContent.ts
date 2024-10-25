import { useEffect, useState } from "react"

export const useRestructuringContent = (
  scrollContainer: HTMLElement | null,
  trackedDiv: HTMLElement | null,
  position?: number,
) => {
  const [isRestructuringContent, setIsRestructuringContent] = useState(false)

  const [init, setInit] = useState(false)

  useEffect(() => {
    if (!trackedDiv || !scrollContainer) return

    const scrollHandler = () => {
      const { y: bodyContentPositionY = 0 } = trackedDiv.getBoundingClientRect()

      if (!position) {
        // eslint-disable-next-line no-console
        console.log(bodyContentPositionY)

        return
      }

      if (isRestructuringContent !== bodyContentPositionY < position)
        setIsRestructuringContent(bodyContentPositionY < position)
    }

    scrollContainer.addEventListener("scroll", scrollHandler)

    return () => scrollContainer.removeEventListener("scroll", scrollHandler)
  }, [
    scrollContainer,
    position,
    trackedDiv,
    init,
    setIsRestructuringContent,
    isRestructuringContent,
  ])

  useEffect(() => {
    setInit(true)
  }, [])

  return { isRestructuringContent }
}
