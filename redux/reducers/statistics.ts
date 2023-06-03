import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statistics = createApi({
  reducerPath: "statistics",
  tagTypes: ["Statistics"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    gettingStatisticsCourseCount: build.query({
      query: ({token}) => ({
        url: `/course/count`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              {
                id: result.id,
                type: "Statistics",
              },
              { type: "Statistics", id: "LIST" },
            ]
          : [{ type: "Statistics", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    gettingStatisticsUserCount: build.query({
      query: ({token}) => ({
        url: `/user/count`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              {
                id: result.id,
                type: "Statistics",
              },
              { type: "Statistics", id: "LIST" },
            ]
          : [{ type: "Statistics", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    gettingStatisticsUserTodayCount: build.query({
      query: ({token}) => ({
        url: `/user/count/today`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              {
                id: result.id,
                type: "Statistics",
              },
              { type: "Statistics", id: "LIST" },
            ]
          : [{ type: "Statistics", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    gettingStatisticsReviewCount: build.query({
      query: ({token}) => ({
        url: `/review/count`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              {
                id: result.id,
                type: "Statistics",
              },
              { type: "Statistics", id: "LIST" },
            ]
          : [{ type: "Statistics", id: "LIST" }],
    }),
  }),
});

export const {
  useGettingStatisticsCourseCountQuery,
  useGettingStatisticsUserCountQuery,
  useGettingStatisticsUserTodayCountQuery,
  useGettingStatisticsReviewCountQuery,
} = statistics;
