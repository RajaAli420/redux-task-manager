"use client";
import { useForm } from "react-hook-form";
import { useDispatchHook } from "../../../redux/hooks";
import { loginUser } from "../../../redux/user.reducers";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useRouter } from "next/navigation";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const dispatch = useDispatchHook();
  const users = useSelector((state: RootState) => state.users);
  const router = useRouter();

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginUser(data));
    const user = users.find((user) => user.email === data.email);

    if (user) {
      if (user.isLoggedIn) {
        localStorage.setItem("userId", user.id.toString());
        router.push("/");
      }
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                errors.email
                  ? "border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                errors.password
                  ? "border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => router.push("/auth/signup")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
