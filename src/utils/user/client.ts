import jwtDecode from "jwt-decode";
import { getCookie } from "../cookies";

import type { User } from "./server";

export default function getClientUser() {
  const authToken = getCookie("auth_token");

  if (authToken !== "") {
    return jwtDecode<User>(authToken);
  } else {
    return null;
  }
}
