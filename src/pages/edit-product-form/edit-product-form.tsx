import { SubmitHandler, useForm } from "react-hook-form";
import "./edit-product-form.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../services/products/product.api";
import { Product } from "../../interfaces/products/product.interface";
import { useGetAllProductCategoriesQuery } from "../../services/products/product-category.api";

const EditProductSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  category: z.string().uuid({ message: "Invalid UUID" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  weight: z.coerce
    .number()
    .positive({ message: "Weight must be a positive number" }),
  supplier: z
    .string()
    .min(2, { message: "Supplier must be at least 2 characters long" }),
  imageUrl: z.string().url({ message: "Image URL must be a valid URL" }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters long" }),
});

type FormFields = z.infer<typeof EditProductSchema>;

export default function EditProductForm() {
  const { id } = useParams();
  const location = useLocation();
  const { product: productState } = location.state;
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(productState || null);

  const { data: fetchedProduct } = useGetProductByIdQuery(id!, {
    skip: productState,
  });

  const [updateProduct] = useUpdateProductMutation();

  const { data: categories } = useGetAllProductCategoriesQuery();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(EditProductSchema),
  });

  useEffect(() => {
    if (!productState && fetchedProduct) {
      setProduct(fetchedProduct);
    }
  }, [productState, fetchedProduct]);

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("category", product.category.id);
      setValue("price", product.price);
      setValue("weight", product.weight);
      setValue("supplier", product.supplier);
      setValue("imageUrl", product.imageUrl);
      setValue("description", product.description);
    }
  }, [product, setValue]);

  const onSubmit: SubmitHandler<FormFields> = async (productData) => {
    if (id && product) {
      try {
        await updateProduct({ id, productData });
        navigate(-1);
      } catch (err) {
        if (err instanceof Error) {
          setError("root", {
            message: err.message,
          });
        }
      }
    }
  };

  return (
    <>
      <div className="edit-form-body">
        <h1>Edit: {product?.name}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            id="name"
          />
          {errors.name && <div className="text-red">{errors.name.message}</div>}

          <label htmlFor="category">Category</label>
          <select {...register("category")} id="category">
            <option value="">Select a category</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>

          <label htmlFor="price">Price</label>
          <input
            {...register("price")}
            type="number"
            placeholder="Price"
            id="price"
          />
          {errors.price && (
            <div className="text-red">{errors.price.message}</div>
          )}

          <label htmlFor="weight">Weight</label>
          <input
            {...register("weight")}
            type="number"
            placeholder="Weight"
            id="weight"
            step="any"
          />
          {errors.weight && (
            <div className="text-red">{errors.weight.message}</div>
          )}

          <label htmlFor="supplier">Supplier</label>
          <input
            {...register("supplier")}
            type="text"
            placeholder="Supplier"
            id="supplier"
          />
          {errors.supplier && (
            <div className="text-red">{errors.supplier.message}</div>
          )}

          <label htmlFor="imageUrl">Image URL</label>
          <input
            {...register("imageUrl")}
            type="text"
            placeholder="Image URL"
            id="imageUrl"
          />
          {errors.imageUrl && (
            <div className="text-red">{errors.imageUrl.message}</div>
          )}

          <label htmlFor="description">Description</label>
          <input
            {...register("description")}
            type="textarea"
            placeholder="Description"
            id="description"
          />
          {errors.description && (
            <div className="text-red">{errors.description.message}</div>
          )}

          <div className="buttons">
            <button className="cancel" onClick={() => navigate(-1)}>
              CANCEL
            </button>

            <button className="save" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Loading..." : "SAVE"}
            </button>
          </div>

          {errors.root && <div className="text-red">{errors.root.message}</div>}
        </form>
      </div>
    </>
  );
}
