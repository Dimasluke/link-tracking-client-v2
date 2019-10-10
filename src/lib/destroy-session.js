import axios from 'axios';

export default async function destroySession() {
  try {
    await axios.request({
      url: '/api/v1/destroy-session',
      method: 'POST'
    });
  } catch (error) {
    console.log(error);
  }

  return {
    message: 'You have successfully logged out. Thank you.'
  };
}
