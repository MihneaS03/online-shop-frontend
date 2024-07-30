import { BASE_URL, API_URLS } from "../../constants/url.constant"
import { CreateOrderDTO } from "../../interfaces/orders/order.interface";

const ORDERS_BASE_URL: string = BASE_URL + API_URLS.ORDERS;

export const orderService = {
  create: async (orderData: CreateOrderDTO) => {
    try {
      const response = await fetch(ORDERS_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        console.log(await response.text());
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}