import { lazy, Suspense } from "react"

import Loading from "@/components/Loading"

const LazyNotes = lazy(() => import("./Notes"))

export const Notes = () => (
  <Suspense fallback={<Loading />}>
    <LazyNotes />
  </Suspense>
)
