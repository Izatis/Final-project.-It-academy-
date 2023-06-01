import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.slice";
import registerReducer from "./reducers/auth.slice";
import courseReducer from "./reducers/course.slice";
import paymentReducer from "./reducers/payment.slice";
import staticsReducer from "./reducers/statistics.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: registerReducer,
    course: courseReducer,
    payment: paymentReducer,
    statistics: staticsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
