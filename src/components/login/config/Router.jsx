import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../Login';

function LoginRouter(props) {
  const { custom } = props;
  return (
    <BrowserRouter>
      <Route exact path="/login" render={() => <Login custom={custom} />} />
    </BrowserRouter>
  );
}

export default LoginRouter;
