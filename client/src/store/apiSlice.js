import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:8080";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      // GET: 'http://localhost:8080/api/categories'
      query: () => "/api/categories",
    }),
    // get labels
    getLabels: builder.query({
      // GET: 'http://localhost:8080/api/labels'
      query: () => "/api/labels",
      providesTags: ["transactions"],
    }),
    // add new transaction
    addTransaction: builder.mutation({
      // POST: 'http://localhost:8080/api/transactions'
      query: (initialTransaction) => ({
        url: "/api/transactions",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transactions"],
    }),

    // delete a transaction
    deleteTransaction: builder.mutation({
      // DELETE: 'http://localhost:8080/api/transactions'
      query: (recordId) => ({
        url: "/api/transactions",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["transactions"],
    }),
  }),
});

export default apiSlice;
