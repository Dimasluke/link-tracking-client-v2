import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PasswordResetConfirm from '../PasswordResetConfirm';
import store from '../redux/store';

function Router(props) {
  const { custom } = props;
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Route
          exact
          path="/password-reset/:token"
          render={() => <PasswordResetConfirm custom={custom} />}
        />
      </Provider>
    </BrowserRouter>
  );
}

export default Router;
