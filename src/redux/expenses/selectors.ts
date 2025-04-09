import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export const getExpenses = (state: RootState) => state.expensesStore.expenses
export const getExpenseById = createSelector(
  [getExpenses, (state, id: string) => id],
  (expenses, id) => expenses.find(exp => exp.id === Number(id)),
)
