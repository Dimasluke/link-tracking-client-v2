import axios from 'axios';
import crypto from 'crypto';
import custom from '../../login/config/custom';

const reset = {
  retry: async function(inputs) {
    const token = await crypto.randomBytes(20).toString('hex');

    let argins = {
      type: 'passwordResetToken',
      token,
      tokenExpiresAt: new Date().getTime() + 3600000,
      username: inputs.email
    };

    try {
      await axios.request({
        url: '/auth/generate-token',
        method: 'POST',
        baseURL: custom.aws.baseUrl,
        auth: {
          username: inputs.clientId,
          password: inputs.clientSecret
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: argins
      });
    } catch (error) {
      return {
        error: true,
        message: 'Unable to complete request. Please try again.'
      };
    }

    argins = {
      email: inputs.email,
      domain: inputs.domain,
      token
    };

    try {
      await axios.request({
        url: '/auth/update-request',
        method: 'POST',
        baseURL: custom.aws.baseUrl,
        auth: {
          username: inputs.clientId,
          password: inputs.clientSecret
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: argins
      });
    } catch (error) {
      return {
        error: true,
        message: 'Unable to complete request. Please try again.'
      };
    }

    return {
      error: false,
      message:
        'Instructions to reset your password have been to sent to your e-mail address.'
    };
  },

  update: async function(inputs) {
    const argins = {
      password: inputs.password,
      username: inputs.username
    };

    try {
      await axios.request({
        url: '/auth/update-password',
        method: 'POST',
        baseURL: custom.aws.baseUrl,
        auth: {
          username: inputs.clientId,
          password: inputs.clientSecret
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: argins
      });
    } catch (error) {
      return {
        error: true,
        message: error.message
      };
    }

    return {
      error: false,
      message: 'Success! Your password has been updated.'
    };
  },

  receipt: async function(inputs) {
    const argins = {
      email: inputs.email
    };

    try {
      await axios.request({
        url: '/auth/update-confirmation',
        method: 'POST',
        baseURL: custom.aws.baseUrl,
        auth: {
          username: inputs.clientId,
          password: inputs.clientSecret
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: argins
      });
    } catch (error) {
      return {
        error: true,
        message: 'Unable to complete request. Please try again.'
      };
    }

    return {
      error: false,
      message: 'Success!'
    };
  }
};

export default reset;
