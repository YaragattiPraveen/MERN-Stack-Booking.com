import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Signup } from "../Api/Actions/Auth";
import { errorNotify, successNotify } from "../utils/tostifyHelp";

export type FormValues = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirm_password?: string;
};

const SignUp = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: Signup,
    onSuccess: () => {
      reset();
      navigate("/login");
      successNotify("User account has been created successfully!")
    },
    onError: (e) => {
      errorNotify((e as any).response.data.message)
    }
  });

  const onSubmit = async (data: FormValues) => {
    await mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-2">
      <h1 className="text-3xl pb-2 font-bold">Create an Account</h1>
      <div className="flex flex-col md:gap-5 md:flex-row">
        <label className="flex flex-1 flex-col py-2 text-gray-600 font-semibold">
          First Name
          <input
            {...register("firstName", { required: "This field is required" })}
            className="rounded py-1 border border-gray-800"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="flex flex-1 flex-col py-2 text-gray-600 font-semibold">
          Last Name
          <input
            {...register("lastName", { required: "This field is required" })}
            className="rounded py-1 border border-gray-800"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="flex flex-1 flex-col py-2 text-gray-600 font-semibold">
        Email
        <input
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
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="rounded py-1 border border-gray-800"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="flex flex-1 flex-col py-2 text-gray-600 font-semibold">
        Confirm Password
        <input
          {...register("confirm_password", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
          className="rounded py-1 border border-gray-800"
        />
        {errors.confirm_password && (
          <span className="text-red-500">
            {errors.confirm_password.message}
          </span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <p>
          Already Registered? <Link to="/signin">Sign In </Link>
        </p>
        <button className="bg-blue-800 px-2 py-2 text-white">
          Create Account
        </button>
      </span>
    </form>
  );
};

export default SignUp;
