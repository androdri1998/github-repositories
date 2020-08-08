import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import configRoutes from './config';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Repository = lazy(() => import('../pages/Repository'));

const Routes: React.FC = () => (
  <Suspense fallback={<>Carregando...</>}>
    <Switch>
      <Route exact path={configRoutes.ROOT} component={Dashboard} />
      <Route path={configRoutes.REPOSITORY_DETAILS} component={Repository} />
    </Switch>
  </Suspense>
);

export default Routes;
