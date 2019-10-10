import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import { handleFirstName, handleFormErrors } from '../redux/login-reducer';

function FirstNameInput(props) {
  const { firstName, isUser, style, formErrors } = props;

  const formCheck = function() {
    const check = _.filter(formErrors, function(error) {
      return error === 'firstName';
    });

    if (check.length) {
      return false;
    }

    if (isUser === undefined || isUser || firstName.length === 0) {
      return undefined;
    }

    return true;
  };

  const handleInput = function(e) {
    const errors = _.remove(formErrors, function(error) {
      return error !== 'firstName';
    });

    props.handleFormErrors({ errors });
    props.handleFirstName({ firstName: e.target.value });
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
          type="text"
          placeholder="First Name"
          onChange={e => handleInput(e)}
          value={firstName}
          valid={formCheck() !== undefined && formCheck()}
          invalid={formCheck() !== undefined && !formCheck()}
        />
      </FormGroup>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    firstName: state.login.firstName,
    isUser: state.login.isUser,
    style: state.login.custom.styles.input,
    formErrors: state.login.formErrors
  };
};

export default connect(
  mapStateToProps,
  { handleFirstName, handleFormErrors }
)(FirstNameInput);
