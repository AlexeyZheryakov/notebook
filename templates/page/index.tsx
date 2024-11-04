import React, { lazy, Suspense } from 'react';

import { Loading } from '../../components';

const LazyTemplateName = lazy(() => import('./TemplateName'));

export const TemplateName = () => (
  <Suspense fallback={<Loading />}>
    <LazyTemplateName />
  </Suspense>
);
