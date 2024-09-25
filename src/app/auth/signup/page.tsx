"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatchHook, useSelectorHook } from "../../../redux/hooks";
import { addUser } from "../../../redux/user.reducers";
import { UserInformation } from "../../../types/user-store.type";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInformation>();
  const dispatch = useDispatchHook();
  const user = useSelectorHook((state) => state.users);
  const router = useRouter();

  const onSubmit = (data: UserInformation) => {
    data.id = user.length + 1;
    data.isLoggedIn = false;
    dispatch(addUser(data));
    alert("User registered successfully!");
    router.push("/auth/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                errors.name
                  ? "border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

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
                  message: "Invalid email format",
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

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role:
            </label>
            <input
              type="text"
              id="role"
              {...register("role", { required: "Role is required" })}
              className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                errors.role
                  ? "border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="w-full py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
