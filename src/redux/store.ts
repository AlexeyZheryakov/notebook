import type { ThunkAction, Action, Reducer } from "@reduxjs/toolkit"
import { configureStore, combineReducers, createAction } from "@reduxjs/toolkit"

import scrollSaveReducer from "./scrollSave/slice"
import expensesReducer from "./expenses/slice"

const combineReducer = combineReducers({
  scrollSaveStore: scrollSaveReducer,
  expensesStore: expensesReducer,
})

const REMOVE_STORE_ACTION_TYPE = "removeStore"

const rootReducer: Reducer = (state: RootState, action: Action) => {
  let copyState = { ...state }

  let copyAction = { ...action }

  if (action.type === REMOVE_STORE_ACTION_TYPE) {
    copyState = {} as RootState

    copyAction = { type: "" }
  }

  return combineReducer(copyState, copyAction)
}

export const store = configureStore({
  reducer: rootReducer,
})

export const removeStore = createAction(REMOVE_STORE_ACTION_TYPE)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof combineReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
