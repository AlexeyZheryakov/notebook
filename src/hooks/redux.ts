// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../redux/store"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
