import axios from 'axios';
import config from '../config/custom';

const checkExistingAlias = async function(alias) {
  let url;

  try {
    url = await axios.request({
      url: `/v1/urls/${alias}`,
      method: 'GET',
      baseURL: config.aws.baseURL
    });
  } catch (error) {
    console.log(error);
  }

  return url.data;
};

export default async function createUrl(alias, destination, tags, owner) {
  const argins = {
    alias: alias || undefined,
    destination,
    tags,
    owner
  };

  const isExistingAlias = await checkExistingAlias(alias);

  if (isExistingAlias) {
    return {
      error: true,
      message: 'Duplicate alias. Please try again.'
    };
  }

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
    error: false,
    message: 'URL successfully created.'
  };
}
