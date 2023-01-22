import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  read: [],
};

export const readSlice = createSlice({
  name: "read",
  initialState,

  reducers: {
    addToRead: (state, action) => {
        state.read.push({ ...action.payload });
    },
  },
});
export const { addToRead  } = readSlice.actions;

export default readSlice.reducer;