import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  IAddingALessonParams,
  ILessonState,
} from "../types/lesson";

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
  lessonIdBackend: "",
  isLoading: false,
  error: "",
};

export const lessonSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ADDING A LESSON
    builder.addCase(addingALesson.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(addingALesson.fulfilled, (state: any, action) => {
      state.lessonIdBackend = action.payload;
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
