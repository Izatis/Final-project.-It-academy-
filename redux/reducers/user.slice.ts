import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "@/redux/types/user";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, thunkAPI) => {
    try {
      const {data} = await axios.get<IUser[]>(BASE_URL);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

interface UserSlice {
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: UserSlice = {
  users: [],
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
    },

    [fetchUsers.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
