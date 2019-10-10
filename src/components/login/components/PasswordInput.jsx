import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import _ from 'lodash';
import { handlePassword, handleFormErrors } from '../redux/login-reducer';

function PasswordInput(props) {
  const { password, isUser, style, formErrors } = props;

  const formCheck = function() {
    const check = _.filter(formErrors, function(error) {
      return error === 'password';
    });

    if (check.length) {
      return false;
    }

    if (isUser || isUser === undefined || password.length === 0) {
      return undefined;
    }

    return password.length > 0;
  };

  const handleInput = function(e) {
    const errors = _.remove(formErrors, function(error) {
      return error !== 'password';
    });

    props.handleFormErrors({ errors });
    props.handlePassword({ password: e.target.value });
  };

  return (
    <div style={isUser === undefined ? { display: 'none' } : { width: '100%' }}>
      <FormGroup>
        <Input
          style={style}
          type="password"
          placeholder="Password"
          onChange={e => handleInput(e)}
          value={password}
          valid={formCheck() !== undefined && formCheck()}
          invalid={formCheck() !== undefined && !formCheck()}
        />
      </FormGroup>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    password: state.login.password,
    isUser: state.login.isUser,
    style: state.login.custom.styles.input,
    formErrors: state.login.formErrors
  };
};

export default connect(
  mapStateToProps,
  { handlePassword, handleFormErrors }
)(PasswordInput);
