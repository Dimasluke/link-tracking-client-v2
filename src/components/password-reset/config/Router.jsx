import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PasswordReset from '../PasswordReset';

function PasswordResetRouter(props) {
  const { custom } = props;
  return (
    <BrowserRouter>
      <Route
        exact
        path="/password-reset"
        render={() => <PasswordReset custom={custom} />}
      />
    </BrowserRouter>
  );
}

export default PasswordResetRouter;
