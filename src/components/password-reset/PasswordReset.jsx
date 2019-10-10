import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Message from './components/Message';
import EmailInput from './components/EmailInput';
import Button from './components/Button';
import store from './redux/store';
import initialConfig from './config/default';
import Login from './components/Login';

function PasswordReset(props) {
  const { custom } = props;

  let config = {};

  if (!custom) {
    config = initialConfig;
  } else {
    if (!custom.header) {
      config.header = initialConfig.header;
    } else {
      config.header = custom.header;
    }

    config.client = custom.client;

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
          <Message />
          <EmailInput />
          <Button />
          <Login />
        </form>
      </Provider>
    </div>
  );
}

export default PasswordReset;
