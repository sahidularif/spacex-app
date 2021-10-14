import { createSlice } from "@reduxjs/toolkit";

export const fetchApiSlice = createSlice({
  name: "filterByDate",
  initialState: {
    rockets: [],
  },
  reducers: {
    getApiData: (state, action) => {
      state.rockets = action.payload;
    }
  }
});

export const { getApiData } = fetchApiSlice.actions;

export const selectRockets = (state) => state.fetchApi.rockets;

export default fetchApiSlice.reducer;
