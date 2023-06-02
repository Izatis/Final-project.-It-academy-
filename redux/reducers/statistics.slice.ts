import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  IStatisticsState,
  IGettingStatisticsParams,
} from "../types/statistics";

export const gettingStatistics = createAsyncThunk<
  any,
  IGettingStatisticsParams,
  { rejectValue: string }
>("courses/gettingStatistics", async ({ parsedToken }, thunkApi) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const config = {
      headers: { Authorization: `Bearer ${parsedToken}` },
    };

    const courseCountResponse = await axios.get(
      `${baseUrl}/course/count`,
      config
    );
    const userCountResponse = await axios.get(`${baseUrl}/user/count`, config);
    const userCountTodayResponse = await axios.get(
      `${baseUrl}/user/count/today`,
      config
    );
    const reviewCountResponse = await axios.get(
      `${baseUrl}/review/count`,
      config
    );

    const courseCount = courseCountResponse.data;
    const userCount = userCountResponse.data;
    const userCountToday = userCountTodayResponse.data;
    const reviewCount = reviewCountResponse.data;

    const data = {
      courseCount,
      userCount,
      userCountToday,
      reviewCount,
    };

    return data;
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});

const initialState: IStatisticsState = {
  statistics: {},
  isLoading: false,
  error: "",
};

const statisticsSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(gettingStatistics.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(gettingStatistics.fulfilled, (state, action) => {
      state.statistics = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(gettingStatistics.rejected, (state: any, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default statisticsSlice.reducer;
