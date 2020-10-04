import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import TransactionDetailed from '../pages/TransactionDetailed';
import New from '../pages/New';
import Chart from '../pages/Chart';
import Import from '../pages/Import';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/graphs" component={Chart} isPrivate />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/new" component={New} isPrivate />
    <Route path="/import" component={Import} isPrivate />
    <Route path="/:id" component={TransactionDetailed} isPrivate />
  </Switch>
);

export default Routes;
