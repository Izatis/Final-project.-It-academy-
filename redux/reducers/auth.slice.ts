import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  IUserRegistration,
  IUserAuthorization,
  IAuthState,
} from "../types/auth";

const BASE_URL = "https://spring-boot-online-platform.herokuapp.com";

// Отправляем post запрос для регистрации
export const userRegistration = createAsyncThunk<void, IUserRegistration>(
  "user/register",
  async ({ fullName, email, password }, thunkApi) => {
    try {
      const { data } = await axios.post(BASE_URL + "/auth/register", {
        fullName,
        email,
        password,
      });

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
  "user/login",
  async ({ username, password }, thunkApi) => {
    console.log(username, password);

    try {
      const { data } = await axios.post(BASE_URL + "/auth/login", {
        username,
        password,
      });

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
  isError: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = '';
    },
  },

  // SIGNUP USER
  extraReducers: (builder) => {
    builder.addCase(userRegistration.pending, (state: any) => {
      state.loading = true;
    });

    builder.addCase(userRegistration.fulfilled, (state: any, action) => {
      state.token = action.payload;
      state.isLoading = false;
      state.isError = "";
    });

    builder.addCase(userRegistration.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // SIGNIN USER
    builder.addCase(userAuthorization.pending, (state: any) => {
      state.loading = true;
      state.isError = "";
    });

    builder.addCase(userAuthorization.fulfilled, (state: any, action: any) => {
      state.token = action.payload;
      state.loading = false;
      state.isError = "";
    });

    builder.addCase(userAuthorization.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export const { reset } = registerSlice.actions;
export default registerSlice.reducer;
