"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { TaskInformation } from "../types/task.type";

const initialState: TaskInformation[] = [];

export const taskSlice = createSlice({
  initialState: initialState,
  name: "taskInfo",
  reducers: {
    createTask: (state, action: PayloadAction<TaskInformation>) => {
      action.payload.id = state.length + 1;
      action.payload.status = "INCOMPLETE";
      state.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<TaskInformation>) => {
      if (!action.payload.id) {
      }
      const index = state.findIndex((state) => state.id === action.payload.id);
      if (index != -1) {
        state.splice(index, 1);
      }
    },
    UpdateTask: (
      state,
      action: PayloadAction<// TaskInformation &
      {
        newStatus: "COMPLETE" | "INCOMPLETE";
        taskId: number;
      }>
    ) => {
      if (!action.payload.taskId) {
      }

      const index = state.findIndex(
        (state) => state.id === action.payload.taskId
      );
      if (index != -1) {
        state[index].status = action.payload.newStatus;
      }
    },
    UpdateAssignment: (state, action: PayloadAction<TaskInformation>) => {
      if (!action.payload.id) {
      }
      const index = state.findIndex((state) => state.id === action.payload.id);
      if (index != -1) {
        state[index].assignedTo = action.payload.assignedTo;
      }
    },
  },
});
export const TaskReducer = taskSlice.reducer;
export const { createTask, deleteTask, UpdateAssignment, UpdateTask } =
  taskSlice.actions;

export const GetTasks = (state: RootState) => state.tasks;
export const GetOneTask = (state: RootState, taskId: number) =>
  state.tasks.find((state) => state.id === taskId);
