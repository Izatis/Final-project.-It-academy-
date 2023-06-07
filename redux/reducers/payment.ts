import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const payment = createApi({
  reducerPath: "payment",
  tagTypes: ["Payment"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    // GET
    // getGoods: build.query({
    //   query: (limit = "") => `goods?${limit && `_limit=${limit}`}`,
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.map(({ id }: { id: number }) => ({
    //             type: "Payment",
    //             id,
    //           })),
    //           { type: "Payment", id: "LIST" },
    //         ]
    //       : [{ type: "Payment", id: "LIST" }],
    // }),
    // ---------------------------------------------------------------------------------------------------------------------------------
    // POST
    courseFeeCart: build.mutation({
      query: ({ token, values }) => ({
        url: `/stripe/cart?cardNumber=${values.cardNumber}&expMonth=${values.expMonth}&expYear=${values.expYear}&cvc=${values.cvc}`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: [{ type: "Payment", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------
    // DELETE
    // deleteProduct: build.mutation({
    //   query: (id) => ({
    //     url: `goods/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [{ type: "Payment", id: "LIST" }],
    // }),
  }),
});

export const { useCourseFeeCartMutation } = payment;
