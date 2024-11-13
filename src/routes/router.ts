export enum AppRoutes {
  EXPENSES = "expenses",
  //добавить роуты по расходам
}

export const getRouteMain = () => "/"
export const getRouteExpenses = () => "/expenses"
export const getRouteExpensesCreate = () => "/expenses/new"
export const getRouteExpensesEdit = (id: string | number) =>
  `/expenses/${id}/edit`
export const getRouteExpensesDetails = (id: string | number) =>
  `/expenses/${id}`
export const getRouteSettings = () => "/settings"
export const getRouteNotes = () => "/notes"
export const getRouteNotesCreate = () => "/notes/new"
