import { createSlice } from '@reduxjs/toolkit';

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: [],
  },
  reducers: {
    addFavourite: (state, action) => {
      if (state.favourites.some((favourite) => favourite.name.common === action.payload.name.common)) {
        return;
      } else {
        state.favourites = [...state.favourites, action.payload];
      }
    },
    removeFavourite: (state, action) => {
      let newFavArr = state.favourites.filter((country) => country.name.common !== action.payload.name.common);
      state.favourites = [...newFavArr];
    },
    clearFavourites: (state, action) => {
      state.favourites = [];
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
