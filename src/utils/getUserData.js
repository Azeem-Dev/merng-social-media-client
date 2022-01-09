import {
  AUTH_TOKEN_KEY,
  USER_EMAIL_KEY,
  USER_ID_KEY,
  USER_NAME_KEY,
} from "./constants";

export const getUserDataFromMemory = () => {
  let userInfo = {};
  userInfo.id = localStorage.getItem(USER_ID_KEY);
  userInfo.email = localStorage.getItem(USER_EMAIL_KEY);
  userInfo.username = localStorage.getItem(USER_NAME_KEY);
  userInfo.token = localStorage.getItem(AUTH_TOKEN_KEY);
  return userInfo;
};
