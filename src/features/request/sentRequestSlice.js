import { createSlice } from "@reduxjs/toolkit";

const sentRequestsSlice = createSlice({
  name: "sentRequests",
  initialState: [],
  reducers: {
    addSentRequests: (state, action) => action.payload,
    removeSentRequests: () => null,
  },
});

export const { addSentRequests, removeSentRequests } = sentRequestsSlice.actions;
export default sentRequestsSlice.reducer;