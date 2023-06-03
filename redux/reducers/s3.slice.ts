import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IAddingAVideoParams, IVideoState } from "../types/s3";

// ---------------------------------------------------------------------------------------------------------------------------------
// Запрос - для добавление видео

export const addingAVideo = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IAddingAVideoParams,
  { rejectValue: string }
>(
  "courses/addingALesson",
  async ({ lessonId, file, parsedToken }, thunkApi) => {
    if (file) {
      const formData = new FormData();
      formData.append("lessonId", lessonId);
      formData.append("video", file);

      console.log(formData);
      
      fetch(process.env.NEXT_PUBLIC_BASE_URL + "/s3/upload/video", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          // Обработка ошибки
        });
    }
  }
);

const initialState: IVideoState = {
  lessonIdBackend: "",
  isLoading: false,
  error: "",
};

export const lessonSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ADDING A VIDEO
    builder.addCase(addingAVideo.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(addingAVideo.fulfilled, (state: any, action) => {
      state.lessonIdBackend = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(addingAVideo.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default lessonSlice.reducer;
