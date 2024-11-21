import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import  requestsList from "./requestSlice";
import feedList from './feedSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    requests: requestsList,
    feed: feedList,
  },
});

export default appStore;
