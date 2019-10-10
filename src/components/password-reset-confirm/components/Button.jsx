import React from 'react';
import { connect } from 'react-redux';
import {
  handleMessage,
  handlePassword,
  handleConfirmPassword,
  handleSubmitted,
  handleLoading,
  handleFormErrors
} from '../redux/password-reset-confirm';
import reset from '../helpers/reset';
import tokenHelpers from '../helpers/token';
import Loader from './Loader';
import form from '../helpers/form';

function Button(props) {
  const { style, client, submitted, loading, expired } = props;

  const handleSubmit = async function(e) {
    e.preventDefault();

    props.handleLoading({ loading: true });

    const errors = await form.formCheck({
      password: props.password,
      confirmPassword: props.confirmPassword
    });

    if (errors.length) {
      props.handleFormErrors({ errors });
      props.handleMessage({ message: 'All fields are required to submit.' });
      props.handleLoading({ loading: false });
      return;
    }

    if (props.password !== props.confirmPassword) {
      props.handleMessage({
        message: 'Passwords must match in order to proceed. Please try again.'
      });
      props.handleLoading({ loading: false });
      return;
    }

    const response = await reset.update({
      username: props.token.user,
      password: props.password,
      clientId: client.clientId,
      clientSecret: client.clientSecret
    });

    if (!response.error) {
      await reset.receipt({
        email: props.token.user
      });

      await tokenHelpers.updateToken({
        token: props.token.token,
        clientId: client.clientId,
        clientSecret: client.clientSecret
      });

      props.handleSubmitted({ submitted: true });
      props.handleMessage({ message: response.message });
      props.handlePassword({ password: '' });
      props.handleConfirmPassword({ passwordConfirm: '' });
      props.handleLoading({ loading: false });
    }
  };

  return (
    <div style={expired ? { display: 'none' } : null}>
      <div>
        {submitted ? (
          <a href={`${client.baseUrl}/login`}>Return to login</a>
        ) : (
          <button style={style} type="submit" onClick={e => handleSubmit(e)}>
            {loading ? <Loader /> : 'Continue'}
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    password: state.reset.password,
    confirmPassword: state.reset.confirmPassword,
    token: state.reset.token,
    submitted: state.reset.submitted,
    loading: state.reset.loading,
    expired: state.reset.expired,
    style: state.reset.custom.styles.button,
    client: state.reset.custom.client
  };
};

export default connect(
  mapStateToProps,
  {
    handleMessage,
    handlePassword,
    handleConfirmPassword,
    handleSubmitted,
    handleLoading,
    handleFormErrors
  }
)(Button);
