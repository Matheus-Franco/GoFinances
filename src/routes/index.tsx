import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import New from '../pages/New';
import TransactionDetailed from '../pages/TransactionDetailed';
import Chart from '../pages/Chart';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/graphs" component={Chart} />

    <Route path="/" exact component={Dashboard} />
    <Route path="/import" component={Import} />
    <Route path="/new" component={New} />
    <Route path="/:id" component={TransactionDetailed} />
  </Switch>
);

export default Routes;
