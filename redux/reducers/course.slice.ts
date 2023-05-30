import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ICourseState } from "../types/course";

// Отправляем get запрос для получение курсов
export const fetchCourses = createAsyncThunk<void, string>(
  "courses/fetchCourses",
  async (parsedToken, thunkApi) => {
    console.log(parsedToken);

    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/course",
        {
          headers: { Authorization: `Bearer ${parsedToken}` },
        }
      );
      console.log(data);

      return data;
    } catch ({ response }: any) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  }
);

interface IFetchDurationParams {
  id: number;
  parsedsToken: string;
  thunkApi?: any;
}

// Отправляем get запрос для получение длительность курсов
export const fetchCourse = createAsyncThunk(
  "course/duration",
  async ({ id, parsedsToken, thunkApi }: IFetchDurationParams) => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + `/course/${id}`,
        {
          headers: { Authorization: `Bearer ${parsedsToken}` },
        }
      );

      const func = async () => {
        try {
          const response = await axios
            .get(data.image, {
              headers: { Authorization: `Bearer ${parsedsToken}` },
            })
            // .then((response: any) => JSON.parse(response));

          data.image = response.data;
          return data;
        } catch (error) {
          console.log(error);
        }
      };

      return func();
    } catch ({ response }: any) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  }
);

// Отправляем get запрос для получение длительность курсов
export const fetchDuration = createAsyncThunk(
  "course/duration",
  async ({ id, parsedsToken, thunkApi }: IFetchDurationParams) => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + `/course/duration/${id}`,
        {
          headers: { Authorization: `Bearer ${parsedsToken}` },
        }
      );

      return data;
    } catch ({ response }: any) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  }
);

const initialState: ICourseState = {
  courses: [],
  course: {},
  isLoading: false,
  error: "",
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Courses GET ALL
    builder.addCase(fetchCourses.pending, (state: any) => {
      state.loading = true;
    });

    builder.addCase(fetchCourses.fulfilled, (state: any, action) => {
      state.courses = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(fetchCourses.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Course GET ITEM
    builder.addCase(fetchCourse.pending, (state: any) => {
      state.loading = true;
    });

    builder.addCase(fetchCourse.fulfilled, (state: any, action) => {
      state.course = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(fetchCourse.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Courses GET DURATION
    // builder.addCase(fetchDuration.pending, (state: any) => {
    //   state.loading = true;
    // });

    // builder.addCase(fetchDuration.fulfilled, (state: any, action) => {
    //   // state.courses = state.courses.push(action.payload);
    //   state.isLoading = false;
    //   state.error = "";
    // });

    // builder.addCase(fetchDuration.rejected, (state: any, action: any) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});

export default courseSlice.reducer;
