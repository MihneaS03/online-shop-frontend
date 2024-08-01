import { BASE_URL, API_URLS } from "../../constants/url.constant"

const CUSTOMERS_BASE_URL: string = BASE_URL + API_URLS.CUSTOMERS;

export const customerService = {
  getById: async (id: string) => {
    try {
      const response = await fetch(`${CUSTOMERS_BASE_URL}/${id}`);

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
  },
}