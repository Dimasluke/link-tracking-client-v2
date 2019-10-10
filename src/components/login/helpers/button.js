const button = {
  handleDisabled: async function(inputs) {
    const { isUser, password, confirmPassword } = inputs;

    if (isUser === undefined) {
      return false;
    }

    if (!isUser && password !== confirmPassword) {
      return true;
    }

    if (!isUser && password.length === 0 && confirmPassword.length === 0) {
      return true;
    }

    return false;
  },

  formCheck: async function(inputs) {
    const { email, password, confirmPassword, firstName, lastName } = inputs;

    const errors = [];

    if (!email) {
      errors.push('email');
    }

    if (!password) {
      errors.push('password');
    }

    if (!confirmPassword) {
      errors.push('confirmPassword');
    }

    if (!firstName) {
      errors.push('firstName');
    }

    if (!lastName) {
      errors.push('lastName');
    }

    return errors;
  }
};

export default button;
