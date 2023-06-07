import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const password = createApi({
  reducerPath: "password",
  tagTypes: ["Password"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    // ---------------------------------------------------------------------------------------------------------------------------------
    passwordRecovery: build.mutation<any, any>({
      query: ({ email }) => ({
        url: "/password/reset?email=" + email,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Password", id: "LIST" }],
    }),

    // ---------------------------------------------------------------------------------------------------------------------------------

    newPasswordRequest: build.mutation<any, any>({
      query: ({ recoveryToken, newPassword }) => ({
        url: `/password/reset/${recoveryToken}?newPassword=${newPassword}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Password", id: "LIST" }],
    }),
  }),
});

export const { usePasswordRecoveryMutation, useNewPasswordRequestMutation } =
  password;
