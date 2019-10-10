/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import _ from 'lodash';
import {
  handleConfirmPassword,
  handleFormErrors
} from '../redux/login-reducer';

function ConfirmPasswordInput(props) {
  const {
    password,
    confirmPassword,
    isUser,
    style,
    formErrors,
    handleFormErrors,
    handleConfirmPassword
  } = props;

  const formCheck = function() {
    const check = _.filter(formErrors, function(error) {
      return error === 'confirmPassword';
    });

    if (check.length) {
      return false;
    }

    if (
      isUser === undefined ||
      isUser ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      return undefined;
    }

    return password === confirmPassword;
  };

  const handleInput = function(e) {
    const errors = _.remove(formErrors, function(error) {
      return error !== 'confirmPassword';
    });

    handleFormErrors({ errors });
    handleConfirmPassword({ confirmPassword: e.target.value });
  };

  return (
    <div
      style={
        isUser === undefined || isUser ? { display: 'none' } : { width: '100%' }
      }
    >
      <FormGroup>
        <Input
          style={style}
          type="password"
          placeholder="Confirm password"
          onChange={e => handleInput(e)}
          value={confirmPassword}
          valid={formCheck() !== undefined && formCheck()}
          invalid={formCheck() !== undefined && !formCheck()}
        />
      </FormGroup>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isUser: state.login.isUser,
    password: state.login.password,
    confirmPassword: state.login.confirmPassword,
    formErrors: state.login.formErrors,
    style: state.login.custom.styles.input
  };
};

export default connect(
  mapStateToProps,
  { handleConfirmPassword, handleFormErrors }
)(ConfirmPasswordInput);
