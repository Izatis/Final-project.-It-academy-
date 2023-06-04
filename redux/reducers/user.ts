import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const user = createApi({
  reducerPath: "user",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    getUser: build.query({
      query: ({ token }) => ({
        url: `/user/current`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              { id: result.id, type: "Users" },
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    getСreator: build.query({
      query: ({ authorId, token }) => ({
        url: `/user/${authorId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              { id: result.id, type: "Users" },
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),

    // // ---------------------------------------------------------------------------------------------------------------------------------
    // addProduct: build.mutation({
    //   query: (body) => ({
    //     url: "goods",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: [{ type: "Users", id: "LIST" }],
    // }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    deletingAUser: build.mutation({
      query: ({ userId, token }) => ({
        url: `user/${userId}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const { useGetUserQuery, useGetСreatorQuery, useDeletingAUserMutation } =
  user;
