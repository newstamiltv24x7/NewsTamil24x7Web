import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  data: {},
};

const UserData = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    addUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addUserData } = UserData.actions;
export default UserData.reducer;
