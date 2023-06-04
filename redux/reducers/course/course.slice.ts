import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ICourseState,
  IPriceFilteringParams,
  ILanguageFilteringParams,
  ICourseCreationParams,
} from "../../types/course";

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для создания курса

export const courseCreation = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  ICourseCreationParams,
  { rejectValue: string }
>(
  "courses/courseCreation",
  async ({ categoryId, value, parsedToken }, thunkApi) => {
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + `/course/${categoryId}`,
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

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для фильтрации по цене

export const priceFiltering = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IPriceFilteringParams,
  { rejectValue: string }
>("course/priceFiltering", async ({ token,option }, thunkApi) => {
  try {
    // Запрос - для фильтрации по убыванию
    if (option === "descending") {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + `/course/filter/price`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    }
    // Запрос - для фильтрации по возрастанию
    else {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/course/filter/price?filter=desc",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    }
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для филтрации по языку

export const languageFiltering = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  ILanguageFilteringParams,
  { rejectValue: string }
>("course/languageFiltering", async ({ token, option }, thunkApi) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/course/language/${option}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});

const initialState: ICourseState = {
  courses: [],
   myCourse: [],
  courseIdBackend: null,
  isLoading: false,
  error: "",
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // COURSE CREATION
    builder.addCase(courseCreation.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(courseCreation.fulfilled, (state: any, action) => {
      state.courseIdBackend = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(courseCreation.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // PRICE FILTERING
    builder.addCase(priceFiltering.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(priceFiltering.fulfilled, (state: any, action) => {
      state.courses = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(priceFiltering.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // LANGUAGE FILTERING
    builder.addCase(languageFiltering.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(languageFiltering.fulfilled, (state: any, action) => {
      state.courses = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(languageFiltering.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default courseSlice.reducer;
