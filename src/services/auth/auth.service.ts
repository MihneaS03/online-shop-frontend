import { BASE_URL, API_URLS } from "../../constants/url.constant"
import { LoginDTO } from "../../interfaces/customers/customer.interface";

const AUTH_BASE_URL: string = BASE_URL + API_URLS.AUTH;

export const authService = {
  login: async (userData: LoginDTO) => {
    try {
      const response = await fetch(AUTH_BASE_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        if (response.status === 401) {
          //window.location.replace("/login");
        }
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}