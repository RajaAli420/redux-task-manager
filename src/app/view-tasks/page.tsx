"use client";
import { useRouter } from "next/navigation";
import BackButton from "../../components/back-button";
import { useDispatchHook, useSelectorHook } from "../../redux/hooks";
import { UpdateTask } from "../../redux/task.reducer";
import { TaskInformation } from "../../types/task.type";
import { useEffect, useState } from "react";

const ViewTasksPage = () => {
  const [id, setId] = useState<string>("");
  useEffect(() => {
    const id = localStorage.getItem("userId")!;
    setId(id);
  }, []);

  const user = useSelectorHook((state) =>
    state.users.find((u) => u.id === parseInt(id!))
  );
  const dispatch = useDispatchHook();

  const tasks = useSelectorHook((state) => state.tasks);
  const router = useRouter();
  const handleStatusChange = (
    task: TaskInformation,
    newStatus: "COMPLETE" | "INCOMPLETE"
  ) => {
    dispatch(UpdateTask({ taskId: task.id, newStatus }));
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

      <div className="bg-white rounded shadow-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-4">Task List</h1>
        {user?.role === "Admin" ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">All Tasks</h2>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Task Title</th>
                  <th className="border p-2">Assigned To</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-100">
                    <td className="border p-2">{task.name}</td>
                    <td className="border p-2">{task.assignedTo}</td>
                    <td className="border p-2">{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Tasks</h2>
            <ul className="list-disc pl-5">
              {tasks && tasks.length > 0 ? (
                tasks
                  .filter(
                    (task) => String(task.assignedTo) === String(user?.id)
                  )
                  .map((task) => (
                    <li key={task.id} className="mb-2">
                      <span className="font-semibold">{task.name}</span> -{" "}
                      {task.status}
                      <select
                        className="ml-2 p-1 border border-gray-300 rounded"
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(
                            task,
                            e.target.value as "COMPLETE" | "INCOMPLETE"
                          )
                        }
                      >
                        <option value="INCOMPLETE">Incomplete</option>
                        <option value="COMPLETE">Complete</option>
                      </select>
                    </li>
                  ))
              ) : (
                <p>No tasks assigned to you.</p>
              )}
            </ul>
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

export default ViewTasksPage;
