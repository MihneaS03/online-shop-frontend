import { API_URLS } from "../../constants/url.constant";
import { CreateOrderDTO, Order } from "../../interfaces/orders/order.interface";
import { getAuthTokenFromLocalStorage } from "../../utils/local-storage.utils";
import { apiSlice } from "../api-slice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, CreateOrderDTO>({
      query: (orderData) => ({
        url: API_URLS.ORDERS,
        method: "POST",
        headers: { Authorization: `Bearer ${getAuthTokenFromLocalStorage()}` },
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
