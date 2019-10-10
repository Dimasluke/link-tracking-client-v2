import axios from 'axios';
import config from '../config/custom';

export default async function getVisits(id) {
  console.log(id);
  let visits;

  try {
    visits = await axios.request({
      url: `/v1/visits/${id}`,
      method: 'GET',
      baseURL: config.aws.baseURL
    });
  } catch (error) {
    console.log(error);
  }
  console.log(visits);
  return visits.data;
}
