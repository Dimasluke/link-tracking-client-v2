import _ from 'lodash';

const form = {
  formCheck: async function(inputs) {
    const { password, confirmPassword } = inputs;

    const errors = [];

    if (!password) {
      errors.push('password');
    }

    if (!confirmPassword) {
      errors.push('confirmPassword');
    }
    return errors;
  },
  validate: async function(inputs) {
    const check = _.filter(inputs.formErrors, function(error) {
      return error === 'password';
    });

    if (check.length) {
      return false;
    }

    if (inputs.password.length === 0) {
      return undefined;
    }

    return inputs.password.length > 0;
  }
};

export default form;
