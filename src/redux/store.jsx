import { configureStore } from "@reduxjs/toolkit";

import aboutReducer from "../redux/aboutSlice";

import goldPriceReducer from "../redux/goldPriceSlice";

export const store = configureStore({
  reducer: {
    about: aboutReducer,
    goldPrice: goldPriceReducer,
  },
});
