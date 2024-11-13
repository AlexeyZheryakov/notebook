import { lazy, Suspense } from "react"

import Loading from "@/components/Loading"

const LazyNotesEdit = lazy(() => import("./NotesEdit"))

export const NotesEdit = () => (
  <Suspense fallback={<Loading />}>
    <LazyNotesEdit />
  </Suspense>
)
