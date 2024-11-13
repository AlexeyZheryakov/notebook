import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

const NAME = "notes"

const defaultNotes = localStorage.getItem(NAME)
  ? JSON.parse(localStorage.getItem(NAME) ?? "")
  : []

interface INote {
  id: number
  note: string
  date: string
}

interface INotesStore {
  notes: INote[]
}

export const initialState: INotesStore = {
  notes: defaultNotes,
}

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, { payload }: PayloadAction<INote>) => {
      state.notes.unshift(payload)
      localStorage.setItem(NAME, JSON.stringify(state.notes))
    },
    clearNote: (state, { payload }: PayloadAction<number>) => {
      state.notes = state.notes.filter(item => item.id !== payload)
      localStorage.setItem(NAME, JSON.stringify(state.notes))
    },
  },
})

export const { addNote, clearNote } = notesSlice.actions

export default notesSlice.reducer
