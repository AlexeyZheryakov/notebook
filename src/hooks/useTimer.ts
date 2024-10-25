import { useEffect, useState } from "react"

interface InitialValues {
  initialMinutes: number
  initialSeconds: number
}

export const useTimer = ({ initialMinutes, initialSeconds }: InitialValues) => {
  const [minutes, setMinutes] = useState(initialMinutes)

  const [seconds, setSeconds] = useState(initialSeconds)

  const restartTimer = () => {
    setMinutes(initialMinutes)

    setSeconds(initialSeconds)
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
    }, 1000)

    return () => {
      clearInterval(myInterval)
    }
  })

  const timer =
    minutes === 0 && seconds === 0
      ? ""
      : `${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`

  return { timer, restartTimer }
}
