import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormValues } from "./SignUp";
import { useMutation } from "@tanstack/react-query";
import { Signin } from "../Api/Actions/Auth";
import { useAuthStore } from "../Store/useAuthStore";
import { errorNotify, successNotify } from "../utils/tostifyHelp";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const loggedIn = useAuthStore((s: any) => s.loggedIn);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: Signin,
    onSuccess: (data) => {
      loggedIn({
        isAuthenticated: true,
        userDetails: data,
      });
      navigate("/");
      successNotify("Welcome to Booking.Com");
    },
    onError: (e) => {
      loggedIn({
        isAuthenticated: false,
        userDetails: {},
      });
      console.log(e)
      errorNotify((e as any)?.response?.data?.message)
    },
  });

  const onSubmit = async (data: FormValues) => {
    await mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-1 px-2">
      <h1 className="text-3xl pb-2 font-bold">Login to your account</h1>
      <label className="flex flex-1 flex-col py-2 text-gray-600 font-semibold">
        Email
        <input
          type="email"
          {...register("email", { required: "This field is required" })}
          className="rounded py-1 border border-gray-800"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="flex flex-1 flex-col py-2 text-gray-600 font-semibold">
        Password
        <input
          type="password"
          {...register("password", {
            required: "This field is required!",
            minLength: {
              value: 6,
              message: "Minimun 6 charater is required",
            },
          })}
          className="rounded py-1 border border-gray-800"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <p>
          Don't have an account? <Link to="/signup">Sign Up </Link>
        </p>
        <button type="submit" className="bg-blue-800 px-4 py-2 text-white">
          Sign In
        </button>
      </span>
    </form>
  );
};

export default SignIn;
