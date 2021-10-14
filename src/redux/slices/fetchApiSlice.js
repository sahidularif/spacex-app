import { createSlice } from "@reduxjs/toolkit";

export const fetchApiSlice = createSlice({
  name: "rocketLaunch",
  initialState: {
    rockets: [],
    filteredRockets: [],
  },
  reducers: {
    getApiData: (state, action) => {
      state.rockets = action.payload;
      state.filteredRockets = action.payload;
    },
    filterByDate: (state, action) => {
      state.filteredRockets = action.payload;
      // state.date = action.payload.date
    }
  }
});

export const { getApiData, filterByDate } = fetchApiSlice.actions;

export const selectRockets = (state) => state.fetchApi;

export default fetchApiSlice.reducer;
