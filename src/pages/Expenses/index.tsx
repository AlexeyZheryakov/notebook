import { lazy, Suspense } from "react"

import Loading from "@/components/Loading"

const LazyExpenses = lazy(() => import("./Expenses"))

export const Expenses = () => (
  <Suspense fallback={<Loading />}>
    <LazyExpenses />
  </Suspense>
)
