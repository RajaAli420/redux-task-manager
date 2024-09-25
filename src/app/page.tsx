"use client";
import Link from "next/link";
import { useSelectorHook } from "../redux/hooks";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [id, setId] = useState<string>("");
  useEffect(() => {
    const id = localStorage.getItem("userId")!;
    setId(id);
  }, []);
  const loggedInUser = useSelectorHook((state) =>
    state.users.find((u) => u.id === parseInt(id!))
  );
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the Task Management App
      </h1>
      {loggedInUser?.isLoggedIn ? (
        <div className="text-center">
          <h2 className="text-2xl mb-2">Hello, {loggedInUser.name}!</h2>
          <p className="mb-4">You are logged in as {loggedInUser.role}.</p>
          <div className="flex space-x-4">
            {loggedInUser.role === "Admin" ? (
              <>
                <Link
                  href="/create-task"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Create Task
                </Link>
                <Link
                  href="/view-tasks"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  View Tasks
                </Link>
                <Link
                  href="/view-users"
                  className="bg-purple-500 text-white px-4 py-2 rounded"
                >
                  View Users
                </Link>
              </>
            ) : (
              // If the user is not admin (e.g., a regular user), show only 'View Tasks'
              <Link
                href="/view-tasks"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                View Tasks
              </Link>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-2xl mb-2">Please log in to continue.</h2>
            <Link
              href="/auth/login"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Logout
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl mb-2">Please log in to continue.</h2>
          <Link
            href="/auth/login"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
