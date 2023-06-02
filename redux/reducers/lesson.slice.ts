import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  IAddingALessonParams,
  ILessonState,
  IToGetLessonsParams,
} from "../types/lesson";

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для получение уроков по 

export const toGetLessons = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IToGetLessonsParams,
  { rejectValue: string }
>("courses/toGetLessons", async ({ id, parsedToken }, thunkApi) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/lesson/section/${id}`,
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
// Запрос - для добавление урока

export const addingALesson = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IAddingALessonParams,
  { rejectValue: string }
>(
  "courses/addingALesson",
  async ({ sectionId, value, parsedToken }, thunkApi) => {
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + `/lesson/${sectionId}`,
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

const initialState: ILessonState = {
  lessons: [],
  isLoading: false,
  error: "",
};

export const lessonSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

    // ADDING A LESSON
    builder.addCase(addingALesson.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(addingALesson.fulfilled, (state: any, action) => {
      state.lessons = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(addingALesson.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default lessonSlice.reducer;
