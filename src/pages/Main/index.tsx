import { lazy, Suspense } from "react"

import Loading from "@/components/Loading"

const LazyMain = lazy(() => import("./Main"))

export const Main = () => (
  <Suspense fallback={<Loading />}>
    <LazyMain />
  </Suspense>
)
