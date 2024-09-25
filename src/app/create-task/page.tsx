"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatchHook, useSelectorHook } from "../../redux/hooks";
import { createTask } from "../../redux/task.reducer";
import BackButton from "../../components/back-button";
import { TaskInformation } from "../../types/task.type";
import { useState, useEffect } from "react";

const CreateTasksPage = () => {
  const [id, setId] = useState<string>("");
  useEffect(() => {
    const id = localStorage.getItem("userId")!;
    setId(id);
  }, []);
  const users = useSelectorHook((state) =>
    state.users.filter((u) => u.role === "User")
  );
  const user = useSelectorHook((state) =>
    state.users.find((u) => u.id === parseInt(id!))
  );

  const tasks = useSelectorHook((state) => state.tasks);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInformation>();
  const dispatch = useDispatchHook();
  const onSubmit = (data: TaskInformation) => {
    data.assignedTo = parseInt(data.assignedTo.toString());
    dispatch(createTask(data));
  };
  if (!user?.isLoggedIn)
    return (
      <>
        <div>Not Logged IN</div>
      </>
    );
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <BackButton />
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Task Management</h1>
        {user?.role === "Admin" ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Create a New Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                {...register("name", { required: "Task title is required" })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}

              <textarea
                placeholder="Task Description"
                {...register("description", {
                  required: "Task description is required",
                })}
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
              ></textarea>
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
              <select
                {...register("assignedTo", {
                  required: "Please assign a user",
                })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.assignedTo && (
                <p className="text-red-500">{errors.assignedTo.message}</p>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create Task
              </button>
            </form>
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Update Your Task Status
            </h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task?.assignedTo === user?.id)
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-4 border border-gray-300 rounded flex justify-between items-center"
                  >
                    <span>{task.name}</span>
                    <select
                      value={task.status}
                      className="ml-4 border border-gray-300 rounded p-1"
                      onChange={(e) => {
                        console.log(
                          `Updating status of task ${task.id} to ${e.target.value}`
                        );
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                ))}
            </div>
          </div>
        )}
        <button
          onClick={() => router.push("/")}
          className="mt-6 w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CreateTasksPage;
