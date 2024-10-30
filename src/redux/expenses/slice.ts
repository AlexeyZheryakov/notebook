import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

const NAME = "expenses"

const defaultExpenses = localStorage.getItem(NAME)
  ? JSON.parse(localStorage.getItem(NAME) ?? "")
  : []

interface IExpense {
  id: number
  category: string
  description: string
  cost: string
  date: string
}

interface IExpensesStore {
  expenses: IExpense[]
}

export const initialState: IExpensesStore = {
  expenses: defaultExpenses,
}

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, { payload }: PayloadAction<IExpense>) => {
      state.expenses.unshift(payload)
      localStorage.setItem(NAME, JSON.stringify(state.expenses))
    },
    clearExpense: (state, { payload }: PayloadAction<number>) => {
      state.expenses = state.expenses.filter(item => item.id !== payload)
      localStorage.setItem(NAME, JSON.stringify(state.expenses))
    },
  },
})

export const { addExpense, clearExpense } = expensesSlice.actions

export default expensesSlice.reducer
