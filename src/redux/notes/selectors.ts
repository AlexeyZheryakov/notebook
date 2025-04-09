import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export const getNotes = (state: RootState) => state.notesStore.notes
export const getNoteById = createSelector(
  [getNotes, (state, id: string) => id],
  (notes, id) => notes.find(note => note.id === Number(id)),
)
