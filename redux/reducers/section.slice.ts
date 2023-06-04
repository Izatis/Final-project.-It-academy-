import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ISectionState,
  ICreatePartitionParams,
  IGettingPartitionsParams,
} from "../types/section";

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для получение разделов
export const gettingPartitions = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IGettingPartitionsParams,
  { rejectValue: string }
>("courses/gettingPartitions", async ({ token , courseId }, thunkApi) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/section/course/${courseId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для создания раздела
export const createPartition = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  ICreatePartitionParams,
  { rejectValue: string }
>(
  "courses/createPartition",
  async ({ courseId, value, parsedToken }, thunkApi) => {

    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + `/section?courseId=${courseId}`,
        value,
        {
          headers: { Authorization: `Bearer ${parsedToken}` },
        }
      );

      return data;
    } catch ({ response }: any) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  }
);

const initialState: ISectionState = {
  sections: [],
  sectionIdBackend: null,
  isLoading: false,
  error: "",
};

export const sectionSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GETING PARTITIONS
    builder.addCase(gettingPartitions.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(gettingPartitions.fulfilled, (state: any, action) => {
      state.sections = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(gettingPartitions.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // CREATE PARTITIONS
    builder.addCase(createPartition.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(createPartition.fulfilled, (state: any, action: any) => {
      state.sectionIdBackend = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(createPartition.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default sectionSlice.reducer;
