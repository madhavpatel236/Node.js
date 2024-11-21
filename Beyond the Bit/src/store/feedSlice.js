import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    showFeed: (state, action) => action.payload,
    removeUserFromtheFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { showFeed , removeUserFromtheFeed} = feedSlice.actions;

export default feedSlice.reducer;
