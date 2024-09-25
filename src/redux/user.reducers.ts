"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserInformation } from "../types/user-store.type";

const initialState: UserInformation[] = [];

export const userSlice = createSlice({
  initialState: initialState,
  name: "UserInfo",
  reducers: {
    addUser: (state, action: PayloadAction<UserInformation>) => {
      state.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      return state.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<UserInformation>) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    loginUser: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const index = state.findIndex(
        (user) => user.email === action.payload.email
      );

      if (index !== -1) {
        // if (action.payload.password === state[index].password)
        state[index].isLoggedIn = true;
      }
    },
    logoutUser: (state, action: PayloadAction<{ email: string }>) => {
      const index = state.findIndex(
        (user) => user.email === action.payload.email
      );
      if (index !== -1) {
        state[index].isLoggedIn = false;
      }
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser, updateUser, loginUser, logoutUser } =
  userSlice.actions;
export const GetOneUser = (state: RootState, email: string) =>
  state.users.find((state) => state.email === email);
