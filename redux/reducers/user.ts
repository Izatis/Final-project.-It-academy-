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
    getCreator: build.query({
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

    // ---------------------------------------------------------------------------------------------------------------------------------
    // Запроc - для редактирование пользователя

    editingUser: build.mutation({
      query: ({ token, userId, values }) => (
        console.log(token, userId, values),
        {
          url: `/user/${userId}`,
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: values, // Используется `body` вместо `values` для передачи данных
        }
      ),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

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

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetCreatorQuery,
  useEditingUserMutation,
  useDeletingAUserMutation,
} = user;
