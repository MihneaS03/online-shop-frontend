import { API_URLS } from "../../constants/url.constant";
import {
  CreateProductDTO,
  EditProductDTO,
  Product,
} from "../../interfaces/products/product.interface";
import { getAuthTokenFromLocalStorage } from "../../utils/local-storage.utils";
import { apiSlice } from "../api-slice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => ({
        url: API_URLS.PRODUCTS,
        headers: { Authorization: `Bearer ${getAuthTokenFromLocalStorage()}` },
      }),
      providesTags: ["Products"],
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `${API_URLS.PRODUCTS}/${id}`,
        headers: { Authorization: `Bearer ${getAuthTokenFromLocalStorage()}` },
      }),
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation<Product, CreateProductDTO>({
      query: (productData) => ({
        url: API_URLS.PRODUCTS,
        method: "POST",
        headers: { Authorization: `Bearer ${getAuthTokenFromLocalStorage()}` },
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: string; productData: EditProductDTO }
    >({
      query: ({ id, productData }) => ({
        url: `${API_URLS.PRODUCTS}/${id}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${getAuthTokenFromLocalStorage()}` },
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_URLS.PRODUCTS}/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${getAuthTokenFromLocalStorage()}` },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
