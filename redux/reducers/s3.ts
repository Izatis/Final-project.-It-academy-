import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const s3 = createApi({
  reducerPath: "s3",
  tagTypes: ["Download"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    // getGoods: build.query({
    //   query: (limit = "") => `goods?${limit && `_limit=${limit}`}`,
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.map(({ id }) => ({ type: "Download", id })),
    //           { type: "Download", id: "LIST" },
    //         ]
    //       : [{ type: "Download", id: "LIST" }],
    // }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    changeAvatar: build.mutation({
      query: ({ formData }) => ({
        url: "/s3/upload/user/image",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Download", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    //     deleteProduct: build.mutation({
    //       query: (id) => ({
    //         url: `goods/${id}`,
    //         method: "DELETE",
    //       }),
    //       invalidatesTags: [{ type: "Download", id: "LIST" }],
    //     }),
  }),
});

export const { useChangeAvatarMutation } = s3;
