import { useContext } from "react"
// import { InitialContext } from "../contexts/InitialContext"

export const useDeviceInfo = () => {
  // const context = useContext(InitialContext)

  // if (!context)
  //   throw new Error("Initial context must be use inside InitialProvider")

  // return { deviceInfo: context.currentDeviceInfo }

  return { deviceInfo: "" }
}
