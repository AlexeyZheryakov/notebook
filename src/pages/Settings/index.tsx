import { lazy, Suspense } from "react"

import Loading from "@/components/Loading"

const LazySettings = lazy(() => import("./Settings"))

export const Settings = () => (
  <Suspense fallback={<Loading />}>
    <LazySettings />
  </Suspense>
)
