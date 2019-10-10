/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import {
  handleEmail,
  handleUser,
  handleLoading,
  handlePassword,
  handleConfirmPassword,
  handleFirstName,
  handleLastName,
  handleMessage,
  handleFormErrors
} from '../redux/login-reducer';
import auth from '../helpers/auth';

class EmailInput extends Component {
  async componentDidUpdate(prevProps) {
    const {
      isUser,
      handlePassword,
      handleConfirmPassword,
      handleFirstName,
      handleLastName,
      handleMessage,
      handleFormErrors
    } = this.props;

    if (prevProps.isUser !== isUser) {
      handlePassword({ password: '' });
      handleConfirmPassword({ confirmPassword: '' });
      handleFirstName({ firstName: '' });
      handleLastName({ lastName: '' });
      handleMessage({ message: '' });
      handleFormErrors({ errors: [] });
    }
  }

  render() {
    const {
      isUser,
      email,
      input,
      expression,
      client,
      handleLoading,
      handleEmail,
      handleUser
    } = this.props;

    const handleInput = async function(inputs) {
      handleLoading({ loading: true });
      handleEmail({ email: inputs.email });

      const check = await auth.check({
        email: inputs.email,
        expression,
        clientId: client.clientId,
        clientSecret: client.clientSecret
      });

      handleLoading({ loading: false });
      handleUser({ isUser: check.isUser });
    };

    return (
      <div style={{ width: '100%' }}>
        <FormGroup>
          <Input
            style={input}
            type="text"
            placeholder="Email"
            onChange={e => handleInput({ email: e.target.value })}
            value={email}
            valid={isUser !== undefined && !isUser && email.length > 0}
          />
        </FormGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.login.email,
    isUser: state.login.isUser,
    input: state.login.custom.styles.input,
    expression: state.login.custom.expression,
    client: state.login.custom.client
  };
};

export default connect(
  mapStateToProps,
  {
    handleEmail,
    handleUser,
    handleLoading,
    handlePassword,
    handleConfirmPassword,
    handleFirstName,
    handleLastName,
    handleMessage,
    handleFormErrors
  }
)(EmailInput);
