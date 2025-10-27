import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  data: [],
};

const HomePageNews = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    addMainNews: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addMainNews } = HomePageNews.actions;
export default HomePageNews.reducer;
