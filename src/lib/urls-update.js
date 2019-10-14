import axios from 'axios';
import config from '../config/custom';

export default async function updateUrl(
  alias,
  updatedAlias,
  updatedDestination,
  updatedTags,
  owner
) {
  const argins = {
    updatedAlias,
    updatedDestination,
    updatedTags,
    owner
  };

  try {
    await axios.request({
      url: `/v1/urls/${alias}`,
      method: 'PUT',
      baseURL: config.aws.baseURL,
      data: argins
    });
  } catch (error) {
    console.log(error);
  }

  return {
    message: 'URL successfully updated.'
  };
}
