import { lazy, Suspense } from "react"

import Loading from "@/components/Loading"

const LazyExpensesEdit = lazy(() => import("./ExpensesEdit"))

export const ExpensesEdit = () => (
  <Suspense fallback={<Loading />}>
    <LazyExpensesEdit />
  </Suspense>
)
