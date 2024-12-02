import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    showRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
        const newArray = state.filter((req) => req._id !== action.payload);
        return newArray;
      },
  },
});

export const { showRequests, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;