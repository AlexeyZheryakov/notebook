import { Route, Routes } from "react-router-dom"
import {
  getRouteExpenses,
  getRouteExpensesCreate,
  getRouteExpensesDetails,
  getRouteExpensesEdit,
  getRouteMain,
} from "./router"
import { Main } from "@/pages/Main"
import { Expenses } from "@/pages/Expenses"
import { ExpensesEdit } from "@/pages/ExpensesEdit"

const Router = () => {
  return (
    <Routes>
      <Route path={getRouteMain()} element={<Main />} />
      <Route path={getRouteExpenses()} element={<Expenses />} />
      <Route path={getRouteExpensesCreate()} element={<ExpensesEdit />} />
      <Route path={getRouteExpensesEdit(":id")} element={<ExpensesEdit />} />
      <Route path={getRouteExpensesDetails(":id")} element={<></>} />
      <Route path="*" element={<></>} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default Router
