import React from 'react';
import Router from './pages/Router';
import LoginRouter from './components/login/config/Router';
import PasswordResetRouter from './components/password-reset/config/Router';
import PasswordResetConfirmRouter from './components/password-reset-confirm/config/Router';
import createSession from './lib/create-session';

const custom = {
  login: async function(token) {
    await createSession(token);

    window.location.href = 'http://localhost:3000';
  },
  client: {
    baseUrl: 'http://localhost:3000',
    clientId: '7582d0f3-cb4f-4521-ab2f-804148ee6284',
    clientSecret: '1ceb0901-c262-49b4-833d-a0b9637283d4'
  },
  expression: new RegExp(
    /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(fanza)\.com$/
  )
};

function App() {
  return (
    <div>
      <Router />
      <LoginRouter custom={custom} />
      <PasswordResetRouter custom={custom} />
      <PasswordResetConfirmRouter custom={custom} />
    </div>
  );
}

export default App;
