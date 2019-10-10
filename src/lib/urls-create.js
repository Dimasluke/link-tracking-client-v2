import axios from 'axios';
import config from '../config/custom';

export default async function createUrl(alias, destination, tags, owner) {
  const argins = {
    alias,
    destination,
    tags,
    owner
  };
  console.log(argins);
  try {
    await axios.request({
      url: '/v1/urls',
      method: 'POST',
      baseURL: config.aws.baseURL,
      data: argins
    });
  } catch (error) {
    console.log(error);
  }

  return {
    message: 'URL successfully created.'
  };
}
