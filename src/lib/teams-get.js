import axios from 'axios';
import config from '../config/custom';

export default async function getTeams(user) {
  const params = { user };

  let teams;

  try {
    teams = await axios.request({
      url: '/v1/teams',
      baseURL: config.aws.baseURL,
      params
    });
  } catch (error) {
    console.log(error);
  }

  return teams.data;
}
