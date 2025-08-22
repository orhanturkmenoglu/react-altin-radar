import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://harem-altin-live-gold-price-data.p.rapidapi.com/harem_altin/prices";
const API_HEADERS = {
  "x-rapidapi-host": "harem-altin-live-gold-price-data.p.rapidapi.com",
  "x-rapidapi-key": "5978dcdd46msh7040dc340645555p10b164jsn8eb2ffbbdada",
};

// Async thunk: API'den veri çek
export const fetchGoldPrices = createAsyncThunk(
  "goldPrice/fetchGoldPrices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { headers: API_HEADERS });
      const result = response.data;

      if (!result?.data || !Array.isArray(result.data)) {
        throw new Error("API’den geçerli veri alınamadı.");
      }

      // localStorage cache
      localStorage.setItem("goldData", JSON.stringify(result.data));

      return {
        data: result.data,
        lastUpdate: new Date().toISOString(),
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  data: JSON.parse(localStorage.getItem("goldData")) || [],
  loading: false,
  error: null,
  lastUpdate: null,
};

const goldPriceSlice = createSlice({
  name: "goldPrice",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoldPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoldPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.lastUpdate = action.payload.lastUpdate;
      })

      .addCase(fetchGoldPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {} = goldPriceSlice.actions;
export default goldPriceSlice.reducer;
