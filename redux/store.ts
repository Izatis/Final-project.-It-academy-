import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.slice";
import registerReducer from "./reducers/auth.slice";
import courseReducer from "./reducers/course/course.slice";
import paymentReducer from "./reducers/payment.slice";
import sectionReducer from "./reducers/section.slice";
import lessonReducer from "./reducers/lesson.slice";
import s3Reducer from "./reducers/s3.slice";
import { review } from "./reducers/review";
import { courses } from "@/redux/reducers/course/course";
import { category } from "@/redux/reducers/category";
import { statistics } from "@/redux/reducers/statistics";
import { user } from "@/redux/reducers/user";
import { cart } from "@/redux/reducers/cart";
import { s3 } from "@/redux/reducers/s3";
import search from "@/redux/reducers/search.slice";

const store = configureStore({
  reducer: {
    users: userReducer,
    auth: registerReducer,
    course: courseReducer,
    payment: paymentReducer,
    section: sectionReducer,
    lesson: lessonReducer,
    s33: s3Reducer,
    search: search,
    [review.reducerPath]: review.reducer,
    [courses.reducerPath]: courses.reducer,
    [category.reducerPath]: category.reducer,
    [statistics.reducerPath]: statistics.reducer,
    [user.reducerPath]: user.reducer,
    [cart.reducerPath]: cart.reducer,
    [s3.reducerPath]: s3.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(courses.middleware)
      .concat(category.middleware)
      .concat(statistics.middleware)
      .concat(review.middleware)
      .concat(user.middleware)
      .concat(cart.middleware)
      .concat(s3.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
