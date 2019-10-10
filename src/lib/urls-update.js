import axios from 'axios';

export default async function updateUrl(
  alias,
  updatedAlias,
  updatedDestination,
  updatedTags
) {
  const argins = {
    updatedAlias,
    updatedDestination,
    updatedTags
  };

  try {
    await axios.request({
      url: `/v1/urls/${alias}`,
      method: 'PATCH',
      data: argins
    });
  } catch (error) {
    console.log(error);
  }

  return {
    message: 'URL successfully updated.'
  };
}
