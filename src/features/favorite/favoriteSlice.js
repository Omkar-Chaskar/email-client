import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  favorite: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,

  reducers: {
    addToFavorite: (state, action) => {
        state.favorite.push({ ...action.payload });
    },
    removeFromFavorite: (state, action) => {
      const removeItem = state.favorite.filter((item) => item.id !== action.payload.id);
      state.favorite = removeItem;
    },
  },
});
export const { addToFavorite , removeFromFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;