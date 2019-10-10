import axios from 'axios';

export default async function currentSession() {
  let token;

  try {
    token = await axios.request({
      url: '/api/v1/session',
      method: 'GET'
    });
  } catch (error) {
    console.log(error);
  }

  return token.data;
}
