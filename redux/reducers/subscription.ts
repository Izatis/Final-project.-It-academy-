import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscription = createApi({
  reducerPath: "subscription",
  tagTypes: ["Subscription"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    // GET
    receivingPurchasedCourses: build.query({
      query: ({ token }) => ({
        url: `/course/current`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({
                type: "Subscription",
                id,
              })),
              { type: "Subscription", id: "LIST" },
            ]
          : [{ type: "Subscription", id: "LIST" }],
    }),

    // // ---------------------------------------------------------------------------------------------------------------------------------
    // POST
    // buyСourse: build.mutation({
    //   query: (body) => ({
    //     url: "goods",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: [{ type: "Subscription", id: "LIST" }],
    // }),

    // // ---------------------------------------------------------------------------------------------------------------------------------
    // DELETE
    //   deletingAPurchasedCourse: build.mutation({
    //     query: (id) => ({
    //       url: `goods/${id}`,
    //       method: "DELETE",
    //     }),
    //     invalidatesTags: [{ type: "Subscription", id: "LIST" }],
    //   }),
  }),
});

export const { useReceivingPurchasedCoursesQuery } = subscription;
