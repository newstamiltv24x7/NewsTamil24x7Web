import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  data: [],
};

const HomePageLiveVideo = createSlice({
    name: "news",
    initialState: initialState,
    reducers: {
      addLiveVideo: (state, action) => {
        state.data = action.payload;
      },
    },
  });
  
  export const { addLiveVideo } = HomePageLiveVideo.actions;
  export default HomePageLiveVideo.reducer;