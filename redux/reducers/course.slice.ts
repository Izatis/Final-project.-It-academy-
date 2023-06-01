import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ICourse,
  ICourseState,
  IGettingACourseParams,
  IReceiveCourseSectionsParams,
  IToGetLessonsParams,
  IPriceFilteringParams,
  ILanguageFilteringParams,
} from "../types/course";

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для получение всех курсов
export const gettingAllCourses = createAsyncThunk(
  "courses/gettingAllCourses",
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
// Запрос - для получение курса
export const gettingACourse = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IGettingACourseParams,
  { rejectValue: string }
>("courses/gettingACourse", async ({ id, parsedToken, thunkApi }) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/course/${id}`,
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
// Запрос - для получение разделов курса

export const receiveCourseSections = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IReceiveCourseSectionsParams,
  { rejectValue: string }
>("courses/receiveCourseSections", async ({ id, parsedToken, thunkApi }) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/section/course/${id}`,
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
// Запрос - для получение разделов курса

export const toGetLessons = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IToGetLessonsParams,
  { rejectValue: string }
>("courses/toGetLessons", async ({ id, parsedToken, thunkApi }) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/section/course/${id}`,
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
// Запрос - для фильтрации по цене

export const priceFiltering = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IPriceFilteringParams,
  { rejectValue: string }
>("course/priceFiltering", async ({ option, parsedToken, thunkApi }) => {
  try {
    // Запрос - для фильтрации по убыванию
    if (option === "descending") {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + `/course/filter/price`,
        {
          headers: { Authorization: `Bearer ${parsedToken}` },
        }
      );
      return data;
    }
    // Запрос - для фильтрации по возрастанию
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

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для филтрации по языку

export const languageFiltering = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  ILanguageFilteringParams,
  { rejectValue: string }
>("course/languageFiltering", async ({ language, parsedToken, thunkApi }) => {
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
  course: {},
  sections: [],
  lessons: [],
  isLoading: false,
  error: "",
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GETTING ALL COURSES
    builder.addCase(gettingAllCourses.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(gettingAllCourses.fulfilled, (state: any, action) => {
      state.courses = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(gettingAllCourses.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // GETTING A COURSE
    builder.addCase(gettingACourse.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(gettingACourse.fulfilled, (state: any, action) => {
      state.course = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(gettingACourse.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // GET A COURSE SECTION
    builder.addCase(receiveCourseSections.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(receiveCourseSections.fulfilled, (state: any, action) => {
      state.sections = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(
      receiveCourseSections.rejected,
      (state: any, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // TO GET LESSONS
    builder.addCase(toGetLessons.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(toGetLessons.fulfilled, (state: any, action) => {
      state.lessons = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(toGetLessons.rejected, (state: any, action: any) => {
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
