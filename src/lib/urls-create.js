import axios from 'axios';
import config from '../config/custom';

export default async function createUrl(alias, destination, tags, owner) {
  const argins = {
    alias: alias || undefined,
    destination,
    tags,
    owner
  };

  let results;

  try {
    results = await axios.request({
      url: '/v1/urls',
      method: 'POST',
      baseURL: config.aws.baseURL,
      data: argins
    });
  } catch (error) {
    return {
      error: true,
      message: 'Duplicate alias. Please try again.'
    };
  }

  console.log(results);
  console.log(results.data);

  return {
    message: 'URL successfully created.'
  };
}
