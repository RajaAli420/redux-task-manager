"use client";

import { useReducer, useState } from "react";
import { UserData } from "../../types/user-data.type";

const initialData: UserData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
  },
  addressInfo: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
  accountInfo: {
    username: "",
    password: "",
  },
};

const reducer = (
  state: UserData,
  action: { type: string; payload: { [x: string]: string } }
) => {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };

    case "UPDATE_ADDRESS_INFO":
      return {
        ...state,
        addressInfo: { ...state.addressInfo, ...action.payload },
      };

    case "UPDATE_ACCOUNT_INFO":
      return {
        ...state,
        accountInfo: { ...state.accountInfo, ...action.payload },
      };

    default:
      return state;
  }
};

export default function TestReducers() {
  const [formData, dispatch] = useReducer(reducer, initialData);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) {
      setStep((prev: number) => prev + 1);
    }
    if (step === 3) {
      console.log(formData);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prev: number) => prev - 1);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (step === 1) {
      dispatch({
        type: "UPDATE_PERSONAL_INFO",
        payload: { [name]: value },
      });
    } else if (step === 2) {
      dispatch({
        type: "UPDATE_ADDRESS_INFO",
        payload: { [name]: value },
      });
    } else if (step === 3) {
      dispatch({
        type: "UPDATE_ACCOUNT_INFO",
        payload: { [name]: value },
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">User Registration</h1>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold mb-2">
              Step 1: Personal Information
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.personalInfo.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.personalInfo.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.personalInfo.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold mb-2">
              Step 2: Address Information
            </h2>
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={formData.addressInfo.street}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.addressInfo.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.addressInfo.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={formData.addressInfo.zip}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-semibold mb-2">
              Step 3: Account Information
            </h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.accountInfo.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.accountInfo.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
          </>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            disabled={step === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {step === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
