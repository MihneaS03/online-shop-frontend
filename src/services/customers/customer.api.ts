import { API_URLS } from "../../constants/url.constant";
import { Customer } from "../../interfaces/customers/customer.interface";
import { getAuthTokenFromLocalStorage } from "../../utils/local-storage.utils";
import { apiSlice } from "../api-slice";

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerById: builder.query<Customer, string>({
      query: (id) => ({
        url: `${API_URLS.CUSTOMERS}/${id}`,
        headers: { Authorization: `Bearer ${getAuthTokenFromLocalStorage()}` },
      }),
      providesTags: ["Customers"],
    }),
  }),
});

export const { useGetCustomerByIdQuery } = customerApi;
