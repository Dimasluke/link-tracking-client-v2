import axios from 'axios';
import config from '../config/custom';

export default async function createTeam(title, owner) {
  const argins = {
    title,
    owner
  };

  try {
    await axios.request({
      url: '/v1/teams',
      method: 'POST',
      baseURL: config.aws.baseURL,
      data: argins
    });
  } catch (error) {
    console.log(error);
  }

  return {
    message: 'Team successfully created.'
  };
}
