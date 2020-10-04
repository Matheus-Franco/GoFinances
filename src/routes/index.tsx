import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import TransactionDetailed from '../pages/TransactionDetailed';
/*
import Import from '../pages/Import';
import New from '../pages/New';
import Chart from '../pages/Chart';
*/

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/:id" component={TransactionDetailed} isPrivate />
  </Switch>
);

export default Routes;
