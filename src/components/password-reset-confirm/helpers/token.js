import axios from 'axios';
import { DateTime } from 'luxon';
import custom from '../../login/config/custom';

const tokenHelpers = {
  checkToken: async function(inputs) {
    const time = DateTime.fromMillis(
      parseFloat(JSON.parse(inputs.token.tokenExpiresAt))
    );

    if (time < DateTime.fromMillis(new Date().getTime())) {
      return true;
    }
    return false;
  },

  getToken: async function(inputs) {
    const argins = {
      type: 'passwordResetToken',
      token: inputs.token
    };

    let token;

    try {
      token = await axios.request({
        url: '/auth/get-token',
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

    console.log(token.data);

    return {
      error: false,
      token
    };
  },

  updateToken: async function(inputs) {
    const argins = {
      type: 'passwordResetToken',
      token: inputs.token,
      value: new Date().getTime(),
      attribute: 'tokenExpiresAt'
    };

    try {
      await axios.request({
        url: '/auth/update-token',
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
        message: 'Unable to update token. Please try again.'
      };
    }

    return {
      error: false,
      message: 'Token updated and is now expired.'
    };
  }
};

export default tokenHelpers;
