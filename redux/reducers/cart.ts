import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cart = createApi({
  reducerPath: "cart",
  tagTypes: ["Carts"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    receivingABasket: build.query({
      query: ({ token }) => ({
        url: `/cart`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: any }) => ({ type: "Carts", id })),
              { type: "Carts", id: "LIST" },
            ]
          : [{ type: "Carts", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    basketAmount: build.query({
      query: ({ token }) => ({
        url: `/cart/sum`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              { id: result.id, type: "Carts" },
              { type: "Carts", id: "LIST" },
            ]
          : [{ type: "Carts", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    addingToCart: build.mutation<any, any>({
      query: ({ token, courseId }) => ({
        url: `/cart/add/${courseId}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: [{ type: "Carts", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    removeFromCart: build.mutation<any, any>({
      query: ({ token, courseId }) => ({
        url: `/cart/delete/${courseId}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: [{ type: "Carts", id: "LIST" }],
    }),
  }),
});

export const {
  useReceivingABasketQuery,
  useBasketAmountQuery,
  useAddingToCartMutation,
  useRemoveFromCartMutation,
} = cart;
