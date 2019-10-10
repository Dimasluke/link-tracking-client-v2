import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import _ from 'lodash';
import {
  handleConfirmPassword,
  handleFormErrors
} from '../redux/password-reset-confirm';

function ConfirmPasswordInput(props) {
  const {
    password,
    confirmPassword,
    style,
    submitted,
    formErrors,
    expired
  } = props;

  const formCheck = function() {
    const check = _.filter(formErrors, function(error) {
      return error === 'confirmPassword';
    });

    if (check.length) {
      return false;
    }

    if (confirmPassword.length === 0) {
      return undefined;
    }

    return password === confirmPassword;
  };

  const handleInput = function(e) {
    const errors = _.remove(formErrors, function(error) {
      return error !== 'confirmPassword';
    });

    props.handleFormErrors({ errors });
    props.handleConfirmPassword({ confirmPassword: e.target.value });
  };

  return (
    <div style={expired ? { display: 'none' } : null}>
      <div>
        {submitted ? null : (
          <FormGroup>
            <Input
              style={style}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => handleInput(e)}
              valid={formCheck() !== undefined && formCheck()}
              invalid={formCheck() !== undefined && !formCheck()}
            />
          </FormGroup>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    password: state.reset.password,
    confirmPassword: state.reset.confirmPassword,
    formErrors: state.reset.formErrors,
    submitted: state.reset.submitted,
    expired: state.reset.expired,
    style: state.reset.custom.styles.input
  };
};

export default connect(
  mapStateToProps,
  { handleConfirmPassword, handleFormErrors }
)(ConfirmPasswordInput);
