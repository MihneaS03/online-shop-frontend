import { SubmitHandler, useForm } from "react-hook-form";
import "./add-product-form.scss";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetchCategories } from "../../hooks/products/useFetchCategories";
import { useCreateProduct } from "../../hooks/products/useCreateProduct";

const AddProductSchema = z.object({
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

type FormFields = z.infer<typeof AddProductSchema>;

export default function AddProductForm() {
  const navigate = useNavigate();
  const { categories } = useFetchCategories();
  const { error, createProduct } = useCreateProduct();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(AddProductSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await createProduct(data);
    if (error) {
      setError("root", {
        message: error,
      });
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <div className="add-form-body">
        <h1>Add product</h1>
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
                <option value={category.id}>{category.name}</option>
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
