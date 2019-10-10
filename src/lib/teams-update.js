import axios from 'axios';
import config from '../config/custom';

export default async function updateTeam(
  id,
  updatedTitle,
  updatedCaptain,
  updatedAdmins,
  updatedMembers
) {
  const argins = {
    updatedTitle,
    updatedCaptain,
    updatedAdmins,
    updatedMembers
  };

  try {
    await axios.request({
      url: `/v1/teams/${id}`,
      method: 'PATCH',
      baseURL: config.aws.baseURL,
      data: argins
    });
  } catch (error) {
    console.log(error);
  }

  return {
    message: 'Team successfully updated.'
  };
}
