import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courses = createApi({
  reducerPath: "courses",
  tagTypes: ["Courses"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    getingAllCourses: build.query({
      query: (parsedToken) => ({
        url: `/course`,
        method: "GET",
        headers: { Authorization: `Bearer ${parsedToken}` },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: any }) => ({ type: "Courses", id })),
              { type: "Courses", id: "LIST" },
            ]
          : [{ type: "Courses", id: "LIST" }],
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: "goods",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Courses", id: "LIST" }],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `goods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Courses", id: "LIST" }],
    }),
  }),
});

export const {
  useGetingAllCoursesQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = courses;
