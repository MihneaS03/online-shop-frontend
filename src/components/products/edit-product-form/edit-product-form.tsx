import { SubmitHandler, useForm } from "react-hook-form";
import "./edit-product-form.scss";
import productService from "../../../services/products/product.service";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schema = z.object({
  name: z.string().min(2),
  category: z.string(),
  price: z.coerce.number(),
  weight: z.string().transform((value) => parseInt(value)),
  supplier: z.string(),
  imageUrl: z.string(),
  description: z.string(),
});

type FormFields = z.infer<typeof Schema>;

export default function EditProductForm() {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "", //add all the fields and use the values from the edited file
    },
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await productService.update(id!, data);
    } catch (err) {
      if (err instanceof Error) {
        setError("root", {
          message: err.message,
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} type="text" placeholder="Name" />
        {errors.name && <div className="text-red">{errors.name.message}</div>}
        <select {...register("category")}>
          <option value="1">Smartphones</option>
        </select>
        <input {...register("price")} type="number" placeholder="Price" />
        {errors.price && <div className="text-red">{errors.price.message}</div>}
        <input {...register("weight")} type="number" placeholder="Weight" />
        {errors.weight && (
          <div className="text-red">{errors.weight.message}</div>
        )}
        <input {...register("supplier")} type="text" placeholder="Supplier" />
        {errors.supplier && (
          <div className="text-red">{errors.supplier.message}</div>
        )}
        <input {...register("imageUrl")} type="text" placeholder="Image URL" />
        {errors.imageUrl && (
          <div className="text-red">{errors.imageUrl.message}</div>
        )}
        <input
          {...register("description")}
          type="textarea"
          placeholder="Description"
        />
        {errors.description && (
          <div className="text-red">{errors.description.message}</div>
        )}

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Submit"}
        </button>

        {errors.root && <div className="text-red">{errors.root.message}</div>}
      </form>
    </>
  );
}
