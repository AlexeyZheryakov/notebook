import { lazy, Suspense } from "react"

import Loading from "@/components/Loading"

const LazyTemplateName = lazy(() => import("./TemplateName"))

export const TemplateName = () => (
  <Suspense fallback={<Loading />}>
    <LazyTemplateName />
  </Suspense>
)
