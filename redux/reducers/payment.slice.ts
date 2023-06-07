import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IPaymentState, IStripePay } from "../types/payment";

// Покупка курса
interface IEditingUserParams {
  courseId: number;
  values: IStripePay;
  token: string;
}

export const courseFee = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IEditingUserParams,
  { rejectValue: string }
>("course/fee", async ({ courseId, values, token }, thunkApi) => {
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

const initialState: IPaymentState = {
  massage: "",
  isLoading: false,
  error: "",
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    reset: (state) => {
      state.massage = "";
    },
  },
  extraReducers: (builder) => {
    // COURSE FEE
    builder.addCase(courseFee.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(courseFee.fulfilled, (state: any, action: any) => {
      state.massage = action.payload;
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
