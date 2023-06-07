import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const user = createApi({
  reducerPath: "user",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    getAllUsers: build.query({
      query: ({ token }) => ({
        url: `/user`,
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
    getUser: build.query({
      query: ({ creatorId, token }) => ({
        url: `/user/${creatorId}`,
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
    getCurrentUser: build.query({
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
    // Запроc - для редактирование пользователя

    editingUser: build.mutation<any, any>({
      query: ({ token, values }) => ({
        url: `/user`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: values,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    // POST UNLOCKING
    userUnlock: build.mutation<any, any>({
      query: ({ userId, token }) => ({
        url: `user/unlock/${userId}`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    // POST BLOCKING
    blockingAUser: build.mutation<any, any>({
      query: ({ userId, token }) => ({
        url: `user/block/${userId}`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetCurrentUserQuery,
  useEditingUserMutation,
  useUserUnlockMutation,
  useBlockingAUserMutation,
} = user;
