import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface IPosition {
  positionY: number
  positionX: number
}

export type ScrollSchema = Record<string, IPosition>

interface IScrollSaveStore {
  scroll: ScrollSchema
}

export const initialState: IScrollSaveStore = {
  scroll: {},
}

export const scrollSaveSlice = createSlice({
  name: "scrollSave",
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      {
        payload: { path, positionY, positionX },
      }: PayloadAction<{ path: string; positionY: number; positionX: number }>,
    ) => {
      state.scroll[path] = { positionY, positionX }
    },
    clearScrollPosition: (state, { payload }: PayloadAction<string>) => {
      delete state.scroll[payload]
    },
  },
})

export const { setScrollPosition, clearScrollPosition } =
  scrollSaveSlice.actions

export default scrollSaveSlice.reducer
