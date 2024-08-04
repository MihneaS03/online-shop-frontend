import { API_URLS } from "../../constants/url.constant";
import { ProductCategory } from "../../interfaces/products/product.interface";
import { getAuthTokenFromLocalStorage } from "../../utils/local-storage.utils";
import { apiSlice } from "../api-slice";

export const productCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductCategories: builder.query<ProductCategory[], void>({
      query: () => ({
        url: API_URLS.CATEGORIES,
        headers: { Authorization: `Bearer ${getAuthTokenFromLocalStorage()}` },
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetAllProductCategoriesQuery } = productCategoryApi;
