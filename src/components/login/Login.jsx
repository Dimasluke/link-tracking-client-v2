import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import ConfirmPasswordInput from './components/ConfirmPasswordInput';
import FirstNameInput from './components/FirstNameInput';
import LastNameInput from './components/LastNameInput';
import Button from './components/Button';
import Message from './components/Message';
import initialConfig from './config/default';
import ResetPassword from './components/ResetPassword';

function Login(props) {
  const { custom } = props;

  let config = {};

  config.client = custom.client;

  if (!custom) {
    config = initialConfig;
  } else {
    if (!custom.header) {
      config.header = initialConfig.header;
    } else {
      config.header = custom.header;
    }

    if (!custom.expression) {
      config.expression = initialConfig.expression;
    } else {
      config.expression = custom.expression;
    }

    if (!custom.login) {
      config.login = initialConfig.login;
    } else {
      config.login = custom.login;
    }

    config.styles = {};

    if (!custom.styles) {
      config.styles = initialConfig.styles;
    } else {
      config.styles.input = Object.assign(
        initialConfig.styles.input,
        custom.styles.input
      );

      config.styles.button = Object.assign(
        initialConfig.styles.button,
        custom.styles.button
      );

      config.styles.header = Object.assign(
        initialConfig.styles.header,
        custom.styles.header
      );

      config.styles.message = Object.assign(
        initialConfig.styles.message,
        custom.styles.message
      );

      config.styles.container = Object.assign(
        initialConfig.styles.container,
        custom.styles.container
      );
    }
  }

  return (
    <div>
      <Provider store={store}>
        <form style={config.styles.container}>
          <Header custom={config} />
          <EmailInput />
          <PasswordInput />
          <ConfirmPasswordInput />
          <FirstNameInput />
          <LastNameInput />
          <Message />
          <Button />
          <ResetPassword />
        </form>
      </Provider>
    </div>
  );
}

export default Login;
