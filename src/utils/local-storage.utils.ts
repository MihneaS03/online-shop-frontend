import { USER_LOCAL_STORAGE } from "../constants/local-storage.constant";

export const getAuthTokenFromLocalStorage = () => {
  const userData = localStorage.getItem(USER_LOCAL_STORAGE);
  if (userData) {
    const user: {
      id: string;
      username: string;
      role: string;
      accessToken: string;
    } = JSON.parse(userData);

    return user.accessToken;
  }
  return null;
};
