import axios from 'axios';
import config from '../config/custom';

export default async function filterVisits(id, start, end) {
  const argins = {
    start,
    end
  };

  let visits;

  try {
    visits = await axios.request({
      url: `/v1/visits/${id}`,
      method: 'GET',
      baseURL: config.aws.baseURL,
      params: argins
    });
  } catch (error) {
    console.log(error);
  }

  return visits.data;
}
