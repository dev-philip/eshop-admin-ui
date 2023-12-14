'use client';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/useSlice/userSlice";
import counterReducer from "../store/Features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;