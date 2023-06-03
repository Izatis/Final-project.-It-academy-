import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ISearchState,
  ISearchByCategoryParams,
  ISearchByCoursesParams,
} from "../types/search";

const initialState: ISearchState = {
  resultByCategory: [],
  courseResults: [],
  isLoading: false,
  isError: "",
};

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для поиска по курсам категориям
export const searchByCategory = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  ISearchByCategoryParams,
  { rejectValue: string }
>("courses/searchByCategory", async ({ value, parsedToken }, thunkApi) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/category/title/${value}`,
      {
        headers: { Authorization: `Bearer ${parsedToken}` },
      }
    );
    return data;
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для поиска по курсам
export const searchByCourses = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  ISearchByCoursesParams,
  { rejectValue: string }
>("courses/searchByCourses", async ({ value, parsedToken }, thunkApi) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/course/name/${value}`,
      {
        headers: { Authorization: `Bearer ${parsedToken}` },
      }
    );
    return data;
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});

export const searchSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // SEARCH BY CATEGORY
    builder.addCase(searchByCategory.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(searchByCategory.fulfilled, (state: any, action) => {
      state.resultByCategory = action.payload;
      state.isLoading = false;
      state.isError = "";
    });

    builder.addCase(searchByCategory.rejected, (state: any, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // SEARCH BY COURSES
    builder.addCase(searchByCourses.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(searchByCourses.fulfilled, (state: any, action) => {
      state.courseResults = action.payload;
      state.isLoading = false;
      state.isError = "";
    });

    builder.addCase(searchByCourses.rejected, (state: any, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export default searchSlice.reducer;
