import axios from 'axios';

export default async function createSession(token) {
  try {
    await axios.request({
      url: '/api/v1/create-session',
      method: 'POST',
      data: { token }
    });
  } catch (error) {
    return {
      error
    };
  }

  return token;
}
