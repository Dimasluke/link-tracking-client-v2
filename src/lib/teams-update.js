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
    updatedOwner: updatedCaptain,
    updatedAdmins,
    updatedMembers
  };
  console.log(argins);
  try {
    await axios.request({
      url: `/v1/teams/${id}`,
      method: 'PUT',
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
