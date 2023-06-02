import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import poster from "../../public/design.png";

import { ICategoryState, IGettingACategory } from "../types/category";

// Запрос - для получения категорий
export const gettingACategory = createAsyncThunk<
  any,
  IGettingACategory,
  { rejectValue: string }
>("courses/gettingACategory", async ({ parsedToken }, thunkApi) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/category`,
      {
        headers: { Authorization: `Bearer ${parsedToken}` },
      }
    );

    return data;
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});

const initialState: ICategoryState = {
  categories: [],
  isLoading: false,
  error: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GETTING CATEGORY
    builder.addCase(gettingACategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(gettingACategory.fulfilled, (state, action) => {
      state.categories = action.payload.map((category: any) => ({
        id: category.id,
        title: category.title,
        image: poster,
      }));
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(gettingACategory.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default categorySlice.reducer;
