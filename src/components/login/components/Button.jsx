import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  handleUser,
  handleMessage,
  handleLoading,
  handleFormErrors
} from '../redux/login-reducer';
import auth from '../helpers/auth';
import Loading from './Loader';
import button from '../helpers/button';

function Button(props) {
  const { isUser, style, loading, client, login } = props;

  const handleSubmit = async function(e) {
    e.preventDefault();

    props.handleLoading({ loading: true });

    const argins = {
      email: props.email,
      password: props.password,
      confirmPassword: props.confirmPassword,
      firstName: props.firstName,
      lastName: props.lastName,
      clientId: client.clientId,
      clientSecret: client.clientSecret,
      expression: props.expression
    };

    if (isUser === undefined) {
      const check = await auth.check(argins);

      props.handleUser({ isUser: check.isUser });
      props.handleLoading({ loading: false });
      props.handleMessage({ message: 'Please enter a valid email address.' });
      return;
    }

    const errors = await button.formCheck(argins);

    if (errors.length && !isUser) {
      props.handleFormErrors({ errors });
      props.handleMessage({ message: 'All fields are required to submit.' });
      props.handleLoading({ loading: false });
      return;
    }

    if (!isUser) {
      const user = await auth.register(argins);

      if (user.error) {
        props.handleMessage({ message: user.message });
        return;
      }
    }

    const token = await auth.token(argins);

    if (token.error) {
      props.handleMessage({ message: token.message });
      props.handleLoading({ loading: false });
      return;
    }

    props.handleLoading({ loading: false });

    token.baseUrl = client.baseUrl;
    await login(token);
  };

  return (
    <div style={{ margin: '0 auto' }}>
      <button style={style} type="submit" onClick={e => handleSubmit(e)}>
        {loading ? (
          <Loading />
        ) : (
          <div>{isUser === undefined ? 'Next' : 'Continue'}</div>
        )}
      </button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    email: state.login.email,
    password: state.login.password,
    confirmPassword: state.login.confirmPassword,
    firstName: state.login.firstName,
    lastName: state.login.lastName,
    isUser: state.login.isUser,
    loading: state.login.loading,
    login: state.login.custom.login,
    expression: state.login.custom.expression,
    client: state.login.custom.client,
    style: state.login.custom.styles.button
  };
};

export default connect(
  mapStateToProps,
  { handleUser, handleMessage, handleLoading, handleFormErrors }
)(withRouter(Button));
