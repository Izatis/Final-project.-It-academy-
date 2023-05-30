import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.slice";
import registerReducer from "./reducers/auth.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: registerReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
