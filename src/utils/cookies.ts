const cachedCookies: Record<string, string> = {};

export function getCookie(key: string) {
  if (key in cachedCookies) return cachedCookies[key];

  const name = `${key}=`;
  const decodedCookie = decodeURIComponent(document.cookie);

  const regex = new RegExp(`(?:^|;\\s*)${name}([^;]*)`);
  const match = decodedCookie.match(regex);

  const value = match ? match[1] : "";
  cachedCookies[key] = value;

  return value;
}

export function setCookie(key: string, value: string) {
  const expireDate = new Date(9999, 0, 1).toUTCString();

  document.cookie = `${key}=${value};expires=${expireDate};path=/`;
}

export function removeCookie(key: string) {
  const cookieName = encodeURIComponent(key);

  document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}
