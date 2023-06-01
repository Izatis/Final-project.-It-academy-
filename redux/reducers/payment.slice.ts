import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IPaymentState, IStripePay } from "../types/payment";

// Покупка курса
interface IEditingUserParams {
  id: number;
  stripePay: IStripePay;
  parsedToken: string;
  thunkApi?: any;
}

export const courseFee = createAsyncThunk<
  any, // Измените этот тип на нужный тип возвращаемого значения
  IEditingUserParams,
  { rejectValue: string }
>("course/fee", async ({ id, stripePay, parsedToken, thunkApi }) => {

  try {
    console.log(id);
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/stripe/pay?courseId=${id}&cardNumber=${stripePay.cardNumber}&expMonth=${stripePay.expMonth}&expYear=${stripePay.expYear}&cvc=${stripePay.cvc}`,
      stripePay,
      {
        headers: { Authorization: `Bearer ${parsedToken}` },
      }
    );
    console.log(data);

    return data;
  } catch ({ response }: any) {
    return thunkApi.rejectWithValue(response.data.message);
  }
});

const initialState: IPaymentState = {
  isLoading: false,
  error: "",
};

export const paymentSlice = createSlice({
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
