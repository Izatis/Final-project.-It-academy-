import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const user = createApi({
  reducerPath: "user",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    getTeacher: build.query({
      query: ({ teacherId, token }) => ({
        url: `/user/${teacherId}`,
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

    // // ---------------------------------------------------------------------------------------------------------------------------------
    // deleteProduct: build.mutation({
    //   query: (id) => ({
    //     url: `goods/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [{ type: "Users", id: "LIST" }],
    // }),
  }),
});

export const { useGetTeacherQuery } = user;
