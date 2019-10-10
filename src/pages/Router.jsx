import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import TeamManagement from './TeamManagement';

export default function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/team-management" component={TeamManagement} />
    </BrowserRouter>
  );
}
