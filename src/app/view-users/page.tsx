"use client";
import React from "react";
import { useDispatchHook, useSelectorHook } from "../../redux/hooks";
import { removeUser } from "../../redux/user.reducers";
import BackButton from "../../components/back-button";

const UserListPage = () => {
  const dispatch = useDispatchHook();
  const users = useSelectorHook((state) => state.users);

  const handleDelete = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(removeUser(userId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <BackButton />
      <h1 className="text-4xl font-bold text-blue-700 mb-6">User Management</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 p-4 text-left font-medium text-gray-600">
                Name
              </th>
              <th className="border-b-2 border-gray-300 p-4 text-left font-medium text-gray-600">
                Role
              </th>
              <th className="border-b-2 border-gray-300 p-4 text-right font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="border-b border-gray-200 p-4 text-gray-700">
                    {user.name}
                  </td>
                  <td className="border-b border-gray-200 p-4 text-gray-700">
                    {user.role}
                  </td>
                  <td className="border-b border-gray-200 p-4 text-right">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListPage;
