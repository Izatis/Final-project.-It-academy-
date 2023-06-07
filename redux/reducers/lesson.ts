import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lesson = createApi({
  reducerPath: "lesson",
  tagTypes: ["Lesson"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    // GET
    toGetLessons: build.query({
      query: ({ token, sectionId }) => ({
        url: `/lesson/section/${sectionId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number}) => ({ type: "Lesson", id })),
              { type: "Lesson", id: "LIST" },
            ]
          : [{ type: "Lesson", id: "LIST" }],
    }),

    // // ---------------------------------------------------------------------------------------------------------------------------------
    // POST
    // addProduct: build.mutation<any, any>({
    //   query: (body) => ({
    //     url: "goods",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: [{ type: "Lesson", id: "LIST" }],
    // }),
    // // ---------------------------------------------------------------------------------------------------------------------------------
// DELETE
    // deleteProduct: build.mutation<any, any>({
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
