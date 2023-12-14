'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from "../../store/store";

const user = {
  name: null,
  email: null
}

const initialState: any = {
  user
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutWithRedux: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutWithRedux } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;