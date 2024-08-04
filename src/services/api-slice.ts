import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/url.constant";
import { getAuthTokenFromLocalStorage } from "../utils/local-storage.utils";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: { Authorization: `Bearer ${getAuthTokenFromLocalStorage()}` },
  }),
  tagTypes: ["Products", "Orders", "Customers", "Categories", "Auth"],
  endpoints: () => ({}),
});
