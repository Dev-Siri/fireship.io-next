import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";

export interface User {
  name: string;
  picture: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: Record<string, any>;
}

export default function getServerUser() {
  const nextCookies = cookies();
  const authToken = nextCookies.get("auth_token");

  if (authToken?.value) {
    return jwtDecode<User>(authToken.value);
  } else {
    return null;
  }
}
