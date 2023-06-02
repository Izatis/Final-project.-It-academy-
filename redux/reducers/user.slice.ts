import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  IEditingUser,
  IEditingUserParams,
  IGetAllUserCoursesParams,
  IUser,
  IUserState,
} from "../types/user";

export const fetchUsers = createAsyncThunk<void, string>(
  "user/fetchusersAll",
  async (parsedToken, thunkAPI) => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/user",
        {
          headers: { Authorization: `Bearer ${parsedToken}` },
        }
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

export const fetchUser = createAsyncThunk<void, string>(
  "user/fetchUserItem",
  async (parsedToken, thunkApi) => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/user/current",
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
// Запроc - для получение всех курсов пользователя

export const getAllUserCourses = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IGetAllUserCoursesParams,
  { rejectValue: string }
>("user/getAllUserCourses", async ({ userId, parsedToken }, thunkApi) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/course/author/${userId}`,
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
// Запроc - для редактирование пользователя

export const editingUser = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IEditingUserParams,
  { rejectValue: string }
>("user/editingUser", async ({ value, id, parsedToken }, thunkApi) => {
  console.log(parsedToken);

  try {
    const { data } = await axios.put(
      process.env.NEXT_PUBLIC_BASE_URL + `/user/${id}`,
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

const initialState: IUserState = {
  users: [],
  user: {
    id: 0,
    fullName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    role: "",
    imageName: "",
    imageUrl: "",
  },
  userCourses: [],
  isLoading: false,
  error: "",
};
console.log(initialState.user);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // USER ALL
    builder.addCase(fetchUsers.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state: any, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(fetchUsers.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // USER ITEM
    builder.addCase(fetchUser.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUser.fulfilled, (state: any, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(fetchUser.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

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

    // USER EDITING
    builder.addCase(editingUser.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(editingUser.fulfilled, (state: any, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(editingUser.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
