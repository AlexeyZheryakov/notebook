export enum AppRoutes {
  EXPENSES = "expenses",
  //добавить роуты по расходам
}

export const getRouteMain = () => "/"
export const getRouteExpenses = () => "/expenses"
export const getRouteExpensesCreate = () => "/expenses/new"
export const getRouteExpensesEdit = (id: string) => `/expenses/${id}/edit`
export const getRouteExpensesDetails = (id: string) => `/expenses/${id}`
