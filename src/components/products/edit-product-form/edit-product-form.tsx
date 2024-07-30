import { SubmitHandler, useForm } from "react-hook-form";
import { EditProductDTO } from "../../../interfaces/products/product.interface";
import "./edit-product-form.scss";
import productService from "../../../services/products/product.service";
import { useParams } from "react-router-dom";

export default function EditProductForm() {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProductDTO>();

  const isDecimal = (value: string) => /^\d+(\.\d+)?$/.test(value);

  const onSubmit: SubmitHandler<EditProductDTO> = async (data) => {
    await productService.update(id!, data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", {
            required: "Name is required",
          })}
          type="text"
          placeholder="Name"
        />
        {errors.name && <div className="text-red">{errors.name.message}</div>}
        <select {...register("category")}>
          <option value="1">Smartphones</option>
        </select>
        <input
          {...register("price", {
            required: "Price is required",
            validate: (value) => {
              if (!isDecimal(value.toString())) {
                return "Price must be a decimal";
              }
              return true;
            },
          })}
          type="text"
          placeholder="Price"
        />
        {errors.price && <div className="text-red">{errors.price.message}</div>}
        <input
          {...register("weight", {
            required: "Weight is required",
            validate: (value) => {
              if (!isDecimal(value.toString())) {
                return "Weight must be a decimal";
              }
              return true;
            },
          })}
          type="text"
          placeholder="Weight"
        />
        {errors.weight && (
          <div className="text-red">{errors.weight.message}</div>
        )}
        <input
          {...register("supplier", {
            required: "Supplier is required",
          })}
          type="text"
          placeholder="Supplier"
        />
        {errors.supplier && (
          <div className="text-red">{errors.supplier.message}</div>
        )}
        <input
          {...register("imageUrl", {
            required: "Image URL is required",
          })}
          type="text"
          placeholder="Image URL"
        />
        {errors.imageUrl && (
          <div className="text-red">{errors.imageUrl.message}</div>
        )}
        <input
          {...register("description", {
            required: "Description is required",
          })}
          type="textarea"
          placeholder="Description"
        />
        {errors.description && (
          <div className="text-red">{errors.description.message}</div>
        )}
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
}
