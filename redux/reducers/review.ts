import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const review = createApi({
  reducerPath: "review",
  tagTypes: ["Reviews"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    getReviws: build.query({
      // ---------------------------------------------------------------------------------------------------------------------------------
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

    addReview: build.mutation({
      query: ({token, courseId, values }) => ({
        url: `/review/${courseId}`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { ...values },
      }),
      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    // deleteProduct: build.mutation({
    //   query: (id) => ({
    //     url: `goods/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    // }),
  }),
});

export const { useGetReviwsQuery, useAddReviewMutation } = review;
