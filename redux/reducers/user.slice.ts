import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser, UserState } from "@/redux/types/user";

export const fetchUsers = createAsyncThunk(
  "user/fetchusersAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<IUser[]>(process.env.BASE_URL + "/user");
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

const initialState: UserState = {
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
  isLoading: false,
  error: "",
};

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
  },
});

export default userSlice.reducer;
