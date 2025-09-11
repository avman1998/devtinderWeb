import { configureStore } from "@reduxjs/toolkit";
import connectionSlice from "./connectionSlice";
import feedSlice from "./feedSlice";
import userSlice from "./userSlice";
import requestSlice from "./requestSlice";
const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    connections: connectionSlice,
    requests: requestSlice,
  },
});
export default appStore;
