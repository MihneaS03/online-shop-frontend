import { BASE_URL, API_URLS } from "../../constants/url.constant"

const CATEGORIES_BASE_URL: string = BASE_URL + API_URLS.CATEGORIES;

export const productCategoryService = {
  getAll: async (signal: AbortSignal | null = null) => {
    try {
      const response = await fetch(CATEGORIES_BASE_URL, {signal});

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
}