import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import "./login-page.scss";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";
import { useEffect } from "react";

const LoginUserSchema = z.object({
  username: z.string().min(1, { message: "Please enter a username" }),
  password: z.string().min(1, { message: "Please enter a password" }),
});

type FormFields = z.infer<typeof LoginUserSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(LoginUserSchema),
  });

  const { error, login } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setError("root", {
        message: error,
      });
    }
  }, [error, setError]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const successful = await login(data);
    if (successful) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="login-form-body">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            id="username"
          />
          {errors.username && (
            <div className="text-red">{errors.username.message}</div>
          )}

          <label htmlFor="password">Pasword</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            id="password"
          />
          {errors.password && (
            <div className="text-red">{errors.password.message}</div>
          )}

          <div className="buttons">
            <button className="login" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Loading..." : "LOGIN"}
            </button>
          </div>
          <br />
          {errors.root && <div className="text-red">{errors.root.message}</div>}
        </form>
      </div>
    </>
  );
}
