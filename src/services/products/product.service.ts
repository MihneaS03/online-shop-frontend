import { BASE_URL } from "../../constants/url.constant"

const PRODUCTS_BASE_URL = `${BASE_URL}/products`

const productService = {
  getAll: async (signal: AbortSignal | null = null) => {
    try {
      const response = await fetch(PRODUCTS_BASE_URL, {signal});

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getById: async (id: string, signal: AbortSignal) => {
    try {
      const response = await fetch(`${PRODUCTS_BASE_URL}/${id}`, {signal});

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  delete: async (id: string, signal: AbortSignal) => {
    try {
      const response = await fetch(`${PRODUCTS_BASE_URL}/${id}`, {
        method: 'DELETE',
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default productService;

