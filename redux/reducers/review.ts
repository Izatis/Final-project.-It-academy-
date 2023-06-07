import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const review = createApi({
  reducerPath: "review",
  tagTypes: ["Reviews"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    getReviws: build.query({
      query: ({ token, courseId }) => ({
        url: `/review/course/${courseId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: any }) => ({
                type: "Reviews",
                id,
              })),
              { type: "Reviews", id: "LIST" },
            ]
          : [{ type: "Reviews", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    getReviwsAvgGrade: build.query({
      query: ({ token, courseId }) => (
        console.log(token,courseId),
        {
        url: `/review/course/avg-grade/${courseId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
      result
        ? [
            { id: result.id, type: "Reviews" },
            { type: "Reviews", id: "LIST" },
          ]
        : [{ type: "Reviews", id: "LIST" }],
  }),
    // ---------------------------------------------------------------------------------------------------------------------------------

    addReview: build.mutation<any, any>({
      query: ({ token, courseId, values }) => ({
        url: `/review/${courseId}`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { ...values },
      }),
      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    // deleteProduct: build.mutation<any, any>({
    //   query: (id) => ({
    //     url: `goods/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    // }),
  }),
});

export const { useGetReviwsQuery, useGetReviwsAvgGradeQuery, useAddReviewMutation } = review;
