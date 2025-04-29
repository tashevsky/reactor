import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = "http://localhost:3001/"

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ['Users', 'Feedbacks'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    blockUser: builder.mutation({
      query: ({ id, isBlocked }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: { isBlocked },
      }),
      invalidatesTags: ['Users'],
    }),
    getFeedbacks: builder.query({
      query: () => 'feedbacks',
      providesTags: ['Feedbacks'],
    }),
    blockFeedback: builder.mutation({
      query: ({ id, isBlocked }) => ({
        url: `feedbacks/${id}`,
        method: 'PATCH',
        body: { isBlocked },
      }),
      invalidatesTags: ['Feedbacks'],
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `feedbacks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedbacks'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useBlockUserMutation,
  useGetFeedbacksQuery,
  useBlockFeedbackMutation,
  useDeleteFeedbackMutation,
} = api;