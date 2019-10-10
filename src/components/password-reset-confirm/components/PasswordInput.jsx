import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import _ from 'lodash';
import {
  handlePassword,
  handleFormErrors
} from '../redux/password-reset-confirm';

function PasswordInput(props) {
  const { password, style, submitted, formErrors, expired } = props;

  const formCheck = function() {
    const check = _.filter(formErrors, function(error) {
      return error === 'password';
    });

    if (check.length) {
      return false;
    }

    if (password.length === 0) {
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
    <div style={expired ? { display: 'none' } : null}>
      <div>
        {submitted ? null : (
          <FormGroup>
            <Input
              style={style}
              type="password"
              placeholder="Password"
              value={password}
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
    expired: state.reset.expired,
    password: state.reset.password,
    submitted: state.reset.submitted,
    formErrors: state.reset.formErrors,
    style: state.reset.custom.styles.input
  };
};

export default connect(
  mapStateToProps,
  { handlePassword, handleFormErrors }
)(PasswordInput);
