import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const password = createApi({
  reducerPath: "password",
  tagTypes: ["Password"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    passwordRecovery: build.mutation({
      query: ({ email }) => ({
        url: "/password/reset/?email=" + email,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Password", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------

    newPassword: build.mutation({
      query: ({ resetToken, value }) => ({
        url: `/password/reset/${resetToken}?newPassword=${value}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Password", id: "LIST" }],
    }),
  }),
});

export const { usePasswordRecoveryMutation, useNewPasswordMutation } = password;
