import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addrequests: (state, action) => action.payload,
    removerequests: (state, action) => null,
  },
});

export const { addrequests, removerequests } = requestSlice.actions;
export default requestSlice.reducer;
