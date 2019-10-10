import axios from 'axios';
import config from '../config/custom';

export default async function deleteTeam(id) {
  try {
    await axios.request({
      url: `/v1/teams/${id}`,
      method: 'DELETE',
      baseURL: config.aws.baseURL
    });
  } catch (error) {
    console.log(error);
  }

  return {
    message: 'Team successfully deleted.'
  };
}
