import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  IUserRegistration,
  IUserAuthorization,
  IAuthState,
} from "../types/auth";

// Отправляем post запрос для регистрации
export const userRegistration = createAsyncThunk<void, IUserRegistration>(
  "user/registration",
  async ({ fullName, email, password }, thunkApi) => {    
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/auth/register",
        {
          fullName,
          email,
          password,
        }
      );

      // Сохраняем токен пользователя
      localStorage.setItem("token", JSON.stringify(data.token));

      return data.token;
    } catch ({ response }: any) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  }
);

// Отправляем post запрос для авторизации
export const userAuthorization = createAsyncThunk<void, IUserAuthorization>(
  "user/authorization",
  async ({ username, password }, thunkApi) => {
    console.log({ username, password });

    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/auth/login",
        {
          username,
          password,
        }
      );

      // Сохраняем токен пользователя
      localStorage.setItem("token", JSON.stringify(data.token));

      return data.token;
    } catch ({ response }: any) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  }
);

const initialState: IAuthState = {
  token: "",
  isLoading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = "";
    },
  },

  // SIGNUP USER
  extraReducers: (builder) => {
    builder.addCase(userRegistration.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(userRegistration.fulfilled, (state: any, action) => {
      state.token = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(userRegistration.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // SIGNIN USER
    builder.addCase(userAuthorization.pending, (state: any) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(userAuthorization.fulfilled, (state: any, action: any) => {
      state.token = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(userAuthorization.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
