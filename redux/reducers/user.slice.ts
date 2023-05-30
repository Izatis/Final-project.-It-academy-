import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser, UserState } from "@/redux/types/user";

export const fetchUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<IUser[]>(process.env.BASE_URL + "/user");
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUserItem",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<IUser[]>(
        process.env.NEXT_PUBLIC_BASE_URL + "/current"
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state: any) => {
      state.loading = true;
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
  },
});

export default userSlice.reducer;
