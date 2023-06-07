import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courses = createApi({
  reducerPath: "courses",
  tagTypes: ["Courses"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    getingAllCourses: build.query({
      query: ({ token }) => ({
        url: `/course`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: any }) => ({ type: "Courses", id })),
              { type: "Courses", id: "LIST" },
            ]
          : [{ type: "Courses", id: "LIST" }],
    }),
    // ---------------------------------------------------------------------------------------------------------------------------------
    receiveCoursesAmountPageByCategory: build.mutation({
      query: ({ token, categoryId, pageNumber }) => ({
        url: `/course/category?categoryId=${categoryId}&pageNumber=${pageNumber}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    // Запроc - для получение всех курсов пользователя
    getUserCourses: build.query({
      query: ({ token, userId }) => ({
        url: `/course/author/${userId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: any }) => ({ type: "Courses", id })),
              { type: "Courses", id: "LIST" },
            ]
          : [{ type: "Courses", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    gettingACourse: build.query({
      query: ({ token, courseId }) => ({
        url: `/course/${courseId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              { id: result.id, type: "Courses" },
              { type: "Courses", id: "LIST" },
            ]
          : [{ type: "Courses", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    // addProduct: build.mutation<any, any>({
    //   query: (body) => ({
    //     url: "goods",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: [{ type: "Courses", id: "LIST" }],
    // }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    deletingACourse: build.mutation<any, any>({
      query: ({ token, courseId }) => (        {
          url: `/course/${courseId}`,
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      ),
      invalidatesTags: [{ type: "Courses", id: "LIST" }],
    }),
  }),
});

export const {
  useGetingAllCoursesQuery,
  useReceiveCoursesAmountPageByCategoryMutation,
  useGetUserCoursesQuery,
  useGettingACourseQuery,
  useDeletingACourseMutation,
} = courses;
