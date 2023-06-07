import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { IPaymentState, IStripePay } from "../types/payment";

const initialState: IPaymentState = {
  message: "",
  isLoading: false,
  error: "",
};

// Покупка курса
interface ICourseFeeParams {
  token: string;
  courseId: number;
  values: IStripePay;
}

export const courseFee = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  ICourseFeeParams,
  { rejectValue: string }
>("course/fee", async ({ token, courseId, values }, thunkApi) => {
  try {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/stripe/pay?courseId=${courseId}&cardNumber=${values.cardNumber}&expMonth=${values.expMonth}&expYear=${values.expYear}&cvc=${values.cvc}`,
      values,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});

interface ICourseFeeCartParams {
  token: string;
  courseId: number;
  values: IStripePay;
}

export const courseFeeCart = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  ICourseFeeCartParams,
  { rejectValue: string }
>("course/fee", async ({ token, values }, thunkApi) => {
  try {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/stripe/pay?&cardNumber=${values.cardNumber}&expMonth=${values.expMonth}&expYear=${values.expYear}&cvc=${values.cvc}`,
      values,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // COURSE FEE
    builder.addCase(courseFee.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(courseFee.fulfilled, (state: any, action: any) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(courseFee.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = paymentSlice.actions;
export default paymentSlice.reducer;
