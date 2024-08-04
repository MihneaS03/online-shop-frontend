import { API_URLS } from "../../constants/url.constant";
import { LoginDTO } from "../../interfaces/customers/customer.interface";
import { LoginResponse } from "../../interfaces/auth/login.interface";
import { apiSlice } from "../api-slice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginDTO>({
      query: (loginData) => ({
        url: `${API_URLS.AUTH}/login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
