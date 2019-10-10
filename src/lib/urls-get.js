import axios from 'axios';
import custom from '../config/custom';

export default async function getUrls(user) {
  let urls;

  try {
    urls = await axios.request({
      url: '/v1/urls',
      params: { user },
      baseURL: custom.aws.baseURL
    });
  } catch (error) {
    console.log(error);
  }

  if (!urls) {
    return [];
  }

  return urls.data;
}
