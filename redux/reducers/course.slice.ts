import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ICourse,
  ICourseState,
  IGettingAllCoursesParams,
  IReceiveCoursesByCategoryParams,
  IGettingACourseParams,
  IPriceFilteringParams,
  ILanguageFilteringParams,
  ICourseCreationParams,
} from "../types/course";

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для получение всех курсов
export const gettingAllCourses = createAsyncThunk<
any, // Измените этот тип на нужный тип возвращаемого значения
IGettingAllCoursesParams,
{ rejectValue: string }
>(
  "courses/gettingAllCourses",
  async ({parsedToken}, thunkApi) => {
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
// Запрос - для получение курсов по категории

export const receiveCoursesByCategory = createAsyncThunk<
any, // Измените этот тип на нужный тип возвращаемого значения
IReceiveCoursesByCategoryParams,
{ rejectValue: string }
>(
  "courses/receiveCoursesByCategory",
  async ({categoryId, parsedToken}, thunkApi) => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + `/course/category/${categoryId}`,
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
>("courses/gettingACourse", async ({ courseId, parsedToken}, thunkApi) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/course/${courseId}`,
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
// Запрос - для создания курса

export const courseCreation = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  ICourseCreationParams,
  { rejectValue: string }
>("courses/courseCreation", async ({ categoryId, value, parsedToken }, thunkApi) => {
  console.log(value);

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
});

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для фильтрации по цене

export const priceFiltering = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IPriceFilteringParams,
  { rejectValue: string }
>("course/priceFiltering", async ({ option, parsedToken}, thunkApi) => {
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
>("course/languageFiltering", async ({ language, parsedToken}, thunkApi) => {
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

     // RECEIVE COURSES BY CATEGORY
     builder.addCase(receiveCoursesByCategory.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(receiveCoursesByCategory.fulfilled, (state: any, action) => {
      state.courses = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(receiveCoursesByCategory.rejected, (state: any, action: any) => {
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
