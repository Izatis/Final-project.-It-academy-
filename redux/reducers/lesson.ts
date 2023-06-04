import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lesson = createApi({
  reducerPath: "lesson",
  tagTypes: ["Lesson"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    toGetLessons: build.query({
      query: ({ token, sectionId }) => ({
        url: `/lesson/section/${sectionId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: any }) => ({ type: "Lesson", id })),
              { type: "Lesson", id: "LIST" },
            ]
          : [{ type: "Lesson", id: "LIST" }],
    }),
    // // ---------------------------------------------------------------------------------------------------------------------------------
    // addProduct: build.mutation({
    //   query: (body) => ({
    //     url: "goods",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: [{ type: "Lesson", id: "LIST" }],
    // }),
    // // ---------------------------------------------------------------------------------------------------------------------------------
    // deleteProduct: build.mutation({
    //   query: (id) => ({
    //     url: `goods/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [{ type: "Lesson", id: "LIST" }],
    // }),
  }),
});

export const {
  useToGetLessonsQuery,
  //   useAddProductMutation,
  //   useDeleteProductMutation,
} = lesson;
