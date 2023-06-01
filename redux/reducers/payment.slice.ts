import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IPaymentState } from "../types/payment";

export const courseFee = createAsyncThunk(
  "course/fee",
  async (stripePay, thunkApi) => {
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/password/reset",
        stripePay
      );
      console.log(data);
    } catch ({ response }: any) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  }
);

const initialState: IPaymentState = {
  isLoading: false,
  error: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    // COURSE FEE
    builder.addCase(courseFee.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(courseFee.fulfilled, (state: any) => {
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(courseFee.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default paymentSlice.reducer;
