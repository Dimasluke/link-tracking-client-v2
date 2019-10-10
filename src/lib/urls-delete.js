import axios from 'axios';
import config from '../config/custom';

export default async function deleteUrl(alias) {
  try {
    axios.request({
      url: `/v1/urls/${alias}`,
      method: 'DELETE',
      baseURL: config.aws.baseURL
    });
  } catch (error) {
    console.log(error);
  }

  return {
    message: 'URL successfully deleted.'
  };
}
