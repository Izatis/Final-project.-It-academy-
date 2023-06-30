import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./reducers/sign.slice";
import courseReducer from "./reducers/course/course.slice";
import sectionReducer from "./reducers/section.slice";
import paymentReducer from "./reducers/payment.slice";
import lessonReducer from "./reducers/lesson.slice";
import search from "@/redux/reducers/search.slice";
import { review } from "./reducers/review";
import { courses } from "@/redux/reducers/course/course";
import { category } from "@/redux/reducers/category";
import { statistics } from "@/redux/reducers/statistics";
import { user } from "@/redux/reducers/user";
import { cart } from "@/redux/reducers/cart";
import { s3 } from "@/redux/reducers/s3";
import { password } from "@/redux/reducers/password";
import { lesson } from "@/redux/reducers/lesson";
import { subscription } from "@/redux/reducers/subscription";
import { payment } from "@/redux/reducers/payment";

const store = configureStore({
  reducer: {
    auth: registerReducer,
    course: courseReducer,
    payments: paymentReducer,
    section: sectionReducer,
    lessons: lessonReducer,
    search: search,
    [review.reducerPath]: review.reducer,
    [courses.reducerPath]: courses.reducer,
    [category.reducerPath]: category.reducer,
    [statistics.reducerPath]: statistics.reducer,
    [user.reducerPath]: user.reducer,
    [cart.reducerPath]: cart.reducer,
    [s3.reducerPath]: s3.reducer,
    [password.reducerPath]: password.reducer,
    [lesson.reducerPath]: lesson.reducer,
    [subscription.reducerPath]: subscription.reducer,
    [payment.reducerPath]: payment.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(courses.middleware)
      .concat(category.middleware)
      .concat(statistics.middleware)
      .concat(review.middleware)
      .concat(user.middleware)
      .concat(cart.middleware)
      .concat(s3.middleware)
      .concat(password.middleware)
      .concat(lesson.middleware)
      .concat(subscription.middleware)
      .concat(payment.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
