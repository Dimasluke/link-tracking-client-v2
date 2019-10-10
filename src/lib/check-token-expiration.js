import { DateTime } from 'luxon';

export default async function checkTokenExpiration(accessTokenExpiresAt) {
  const now = DateTime.fromISO(new Date());
  const expirationDate = DateTime.fromISO(accessTokenExpiresAt);

  return now > expirationDate;
}
