import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.slice";
import registerReducer from "./reducers/auth.slice";
import courseReducer from "./reducers/course.slice";
import paymentReducer from "./reducers/payment.slice";
import staticsReducer from "./reducers/statistics.slice";
import sectionReducer from "./reducers/section.slice";
import lessonReducer from "./reducers/lesson.slice";
import categoryReducer from "./reducers/category.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: registerReducer,
    course: courseReducer,
    payment: paymentReducer,
    statistics: staticsReducer,
    section: sectionReducer,
    lesson: lessonReducer,
    category: categoryReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
