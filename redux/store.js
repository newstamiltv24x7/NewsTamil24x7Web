import { configureStore } from "@reduxjs/toolkit";
import HomePageNews from "./reducer/homePageReducer";
import HomePageLiveVideo from "./reducer/liveVideoReducer";
import UserData from "./reducer/userReducer";

export const store = configureStore({
  reducer: {
    HomePageNewsReducer: HomePageNews,
    HomePageLiveReducer: HomePageLiveVideo,
    UserDataReducer: UserData,
  },
});
