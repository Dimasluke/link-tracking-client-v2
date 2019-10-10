import axios from 'axios';
import config from '../config/custom';

export default async function getTags(user) {
  const params = { user };

  let tags;

  try {
    tags = await axios.request({
      url: '/v1/tags',
      method: 'GET',
      baseURL: config.aws.baseURL,
      params
    });
  } catch (error) {
    console.log(error);
  }

  return tags.data;
}
