import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMoreAbout: false,
  showMoreVision: false,
  showMoreMission: false,
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    toggleAbout: (state) => {
      state.showMoreAbout = !state.showMoreAbout;
    },
    toggleVision: (state) => {
      state.showMoreVision = !state.showMoreVision;
    },
    toggleMission: (state) => {
      state.showMoreMission = !state.showMoreMission;
    },
  },
});

export const {toggleAbout,toggleMission,toggleVision} = aboutSlice.actions;
export default aboutSlice.reducer;
