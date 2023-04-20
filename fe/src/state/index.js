import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: "felipe",
  token: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogOut, setMode } = globalSlice.actions;

export default globalSlice.reducer;
