import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ICourseState } from "../types/course";

// Отправляем get запрос для получение курсов
export const fetchCourses = createAsyncThunk<void, string>(
  "courses/fetchCourses",
  async (parsedToken, thunkApi) => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/course",
        {
          headers: { Authorization: `Bearer ${parsedToken}` },
        }
      );

        data.map(async (course: any) => {
          const response = await axios.get(course.imageUrl, {
            headers: { Authorization: `Bearer ${parsedToken}` },
          });
          return response.data;
        })
            
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

// Отправляем get запрос для получение курса
export const fetchCourse = createAsyncThunk(
  "course/fetchCourse",
  async ({ id, parsedsToken, thunkApi }: IFetchDurationParams) => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + `/course/${id}`,
        {
          headers: { Authorization: `Bearer ${parsedsToken}` },
        }
      );

      if (data.imageName !== null) {
        const func = async () => {
          try {
            const response = await axios.get(data.imageUrl, {
              headers: { Authorization: `Bearer ${parsedsToken}` },
            });

            console.log(response);

            data.imageUrl = response.data;
            return data;
          } catch (error) {
            console.log(error);
          }
        };
        return func();
      }
    } catch ({ response }: any) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  }
);

const initialState: ICourseState = {
  courses: [],
  course: {
    id: 0,
    name: "",
    description: "",
    created: "",
    price: 0,
    language: "",
    imageName: "",
    imageUrl: "",
  },
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
      state.isLoading = true;
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
      state.isLoading = true;
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
  },
});

export default courseSlice.reducer;
