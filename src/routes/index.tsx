import { Expenses } from "@/pages/Expenses"
import { ExpensesEdit } from "@/pages/ExpensesEdit"
import { Main } from "@/pages/Main"
import { Notes } from "@/pages/Notes"
import { NotesEdit } from "@/pages/NotesEdit"
import { Settings } from "@/pages/Settings"
import { Route, Routes } from "react-router-dom"
import {
  getRouteExpenses,
  getRouteExpensesCreate,
  getRouteExpensesDetails,
  getRouteExpensesEdit,
  getRouteMain,
  getRouteNotes,
  getRouteNotesCreate,
  getRouteNotesEdit,
  getRouteSettings,
} from "./router"

const Router = () => {
  return (
    <Routes>
      <Route path={getRouteMain()} element={<Main />} />
      <Route path={getRouteExpenses()} element={<Expenses />} />
      <Route path={getRouteExpensesCreate()} element={<ExpensesEdit />} />
      <Route path={getRouteExpensesEdit(":id")} element={<ExpensesEdit />} />
      <Route path={getRouteExpensesDetails(":id")} element={<></>} />
      <Route path={getRouteSettings()} element={<Settings />} />
      <Route path={getRouteNotes()} element={<Notes />} />
      <Route path={getRouteNotesCreate()} element={<NotesEdit />} />
      <Route path={getRouteNotesEdit(":id")} element={<NotesEdit />} />
      <Route path="*" element={<></>} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default Router
