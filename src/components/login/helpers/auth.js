import axios from 'axios';
import qs from 'qs';
import custom from '../config/custom';

const auth = {
  check: async function(inputs) {
    const { expression, clientId, clientSecret, email } = inputs;

    const check = expression.test(inputs.email);

    if (!check) {
      return { isUser: undefined };
    }

    let data;

    try {
      data = await axios.request({
        url: '/auth/check',
        method: 'POST',
        baseURL: custom.aws.baseUrl,
        auth: {
          username: clientId,
          password: clientSecret
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({ username: email })
      });
    } catch (error) {
      return error.message;
    }

    return data.data;
  },

  register: async function(inputs) {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.firstName ||
      !inputs.lastName
    ) {
      return { error: true, message: 'All fields are required to submit.' };
    }

    let user;

    const argins = {
      username: inputs.email,
      password: inputs.password,
      firstName: inputs.firstName,
      lastName: inputs.lastName
    };

    try {
      user = await axios.request({
        url: '/auth/register',
        method: 'POST',
        baseURL: custom.aws.baseUrl,
        auth: {
          username: inputs.clientId,
          password: inputs.clientSecret
        },
        data: qs.stringify(argins)
      });
    } catch (error) {
      return {
        error: true,
        message: 'An error has occured. Please try again.'
      };
    }

    return user.data;
  },

  token: async function(inputs) {
    let token;

    const argins = {
      grant_type: 'password',
      username: inputs.email,
      password: inputs.password
    };

    try {
      token = await axios.request({
        url: '/auth/token',
        method: 'POST',
        baseURL: custom.aws.baseUrl,
        auth: {
          username: inputs.clientId,
          password: inputs.clientSecret
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(argins)
      });
    } catch (error) {
      return {
        error: true,
        message: 'Invalid credentials. Please try again.'
      };
    }

    return token.data;
  }
};

export default auth;
