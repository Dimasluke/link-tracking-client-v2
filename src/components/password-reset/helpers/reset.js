import axios from 'axios';
import crypto from 'crypto';
import custom from '../../login/config/custom';

const reset = {
  token: async function(inputs) {
    let token = await crypto.randomBytes(20).toString('hex');

    const argins = {
      type: 'passwordResetToken',
      token,
      tokenExpiresAt: new Date().getTime() + 36000000,
      username: inputs.email
    };

    try {
      token = await axios.request({
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
      console.log(error);
      return {
        error: true,
        message: 'Unable to complete request. Please try again.'
      };
    }

    return {
      error: false,
      body: token.data
    };
  },

  send: async function(inputs) {
    const argins = {
      email: inputs.email,
      token: inputs.token,
      domain: inputs.domain
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
  }
};

export default reset;
