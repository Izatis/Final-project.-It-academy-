import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  IGetAllUserCoursesParams,
  IUserState,
} from "../types/user";

// ---------------------------------------------------------------------------------------------------------------------------------
// Запроc - для получение всех курсов пользователя

export const getAllUserCourses = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IGetAllUserCoursesParams,
  { rejectValue: string }
>("user/getAllUserCourses", async ({ token, userId }, thunkApi) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/course/author/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});


const initialState: IUserState = {
  users: [],
  userCourses: [],
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // GET ALL USER COURSES
    builder.addCase(getAllUserCourses.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(getAllUserCourses.fulfilled, (state: any, action) => {
      state.userCourses = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(getAllUserCourses.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
