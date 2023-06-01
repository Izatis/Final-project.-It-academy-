import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ICourseState } from "../types/course";
import { ICourse } from "../types/course";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (parsedToken: string, thunkApi: any) => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/course",
        {
          headers: { Authorization: `Bearer ${parsedToken}` },
        }
      );

      const updatedData = await Promise.all(
        data.map(async (course: ICourse) => {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_BASE_URL + `/course/duration/${course.id}`,
            {
              headers: { Authorization: `Bearer ${parsedToken}` },
            }
          );
          return { ...course, duration: response.data };
        })
      );

      return updatedData;
    } catch ({ response }: any) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  }
);

// ---------------------------------------------------------------------------------------------------------------------------------
// Для фильтрации по цене
interface IFilteredPriceParams {
  option: string;
  parsedToken: string;
  thunkApi?: any;
}

export const filteredPrice = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IFilteredPriceParams,
  { rejectValue: string }
>("course/filteredPrice", async ({ option, parsedToken, thunkApi }) => {
  try {
    // Для фильтрации по убыванию
    if (option === "descending") {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + `/course/filter/price`,
        {
          headers: { Authorization: `Bearer ${parsedToken}` },
        }
      );
      return data;
    }
    // Для фильтрации по возрастанию
    else {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/course/filter/price?filter=desc",
        {
          headers: { Authorization: `Bearer ${parsedToken}` },
        }
      );
      return data;
    }
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});

// Для филтрации по языку

interface IFilteredLanguageParams {
  language: string;
  parsedToken: string;
  thunkApi?: any;
}

export const filteredLanguage = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IFilteredLanguageParams,
  { rejectValue: string }
>("course/filteredLanguage", async ({ language, parsedToken, thunkApi }) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/course/language/${language}`,
      {
        headers: { Authorization: `Bearer ${parsedToken}` },
      }
    );
    return data;
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});

const initialState: ICourseState = {
  courses: [],
  isLoading: false,
  error: "",
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // COURSES GET ALL
    builder.addCase(fetchCourses.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCourses.fulfilled, (state: any, action) => {
      state.courses = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(fetchCourses.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // COURSES GET FILTERED MAIN
    builder.addCase(filteredPrice.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(filteredPrice.fulfilled, (state: any, action) => {
      state.courses = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(filteredPrice.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // COURSES GET FILTERED LANGUAGE
    builder.addCase(filteredLanguage.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(filteredLanguage.fulfilled, (state: any, action) => {
      state.courses = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(filteredLanguage.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default courseSlice.reducer;
