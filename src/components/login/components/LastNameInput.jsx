import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import { handleLastName, handleFormErrors } from '../redux/login-reducer';

function LastNameInput(props) {
  const { lastName, isUser, style, formErrors } = props;

  const formCheck = function() {
    const check = _.filter(formErrors, function(error) {
      return error === 'lastName';
    });

    if (check.length) {
      return false;
    }

    if (isUser === undefined || isUser || lastName.length === 0) {
      return undefined;
    }

    return true;
  };

  const handleInput = function(e) {
    const errors = _.remove(formErrors, function(error) {
      return error !== 'lastName';
    });

    props.handleFormErrors({ errors });
    props.handleLastName({ lastName: e.target.value });
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
          placeholder="Last Name"
          onChange={e => handleInput(e)}
          value={lastName}
          valid={formCheck() !== undefined && formCheck()}
          invalid={formCheck() !== undefined && !formCheck()}
        />
      </FormGroup>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    lastName: state.login.lastName,
    isUser: state.login.isUser,
    style: state.login.custom.styles.input,
    formErrors: state.login.formErrors
  };
};

export default connect(
  mapStateToProps,
  { handleLastName, handleFormErrors }
)(LastNameInput);
