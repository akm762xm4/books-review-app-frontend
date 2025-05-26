import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Book,
  BookFormData,
  Review,
  SubmitReview,
  User,
  UserReview,
} from "../types";
import { getAuthUser } from "./useAuthState";

const token = getAuthUser()?.token;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Book", "Review", "User"],
  endpoints: (builder) => ({
    // Books endpoints
    getBooks: builder.query<Book[], void>({
      query: () => ({
        url: "books",
      }),
      providesTags: ["Book", "Review"],
    }),
    getFeaturedBooks: builder.query<Book[], void>({
      query: () => "books/featured",
      providesTags: ["Book", "Review"],
    }),
    getBook: builder.query<Book, string>({
      query: (id) => `books/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),
    createBook: builder.mutation<Book, BookFormData>({
      query: (book) => ({
        url: "books",
        method: "POST",
        body: book,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<Book, { id: string; book: Partial<Book> }>({
      query: ({ id, book }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: book,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Book", id }],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Book"],
    }),

    // Reviews endpoints
    getBookReviews: builder.query<Review[], string>({
      query: (bookId) => `${bookId}/reviews`,
      providesTags: (result, error, bookId) => [{ type: "Review", id: bookId }],
    }),
    submitReview: builder.mutation<
      Review,
      {
        bookId: string;
        review: SubmitReview;
      }
    >({
      query: ({ bookId, review }) => ({
        url: `${bookId}/reviews`,
        method: "POST",
        body: review,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, { bookId }) => [
        { type: "Review", id: bookId },
        { type: "Book", id: bookId },
      ],
    }),

    getUserReviews: builder.query<UserReview[], string>({
      query: (userId) => `user/${userId}/reviews`,
      providesTags: (result, error, userId) => [{ type: "Review", id: userId }],
    }),

    // Auth endpoints
    login: builder.mutation<User, { email: string; password: string }>({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<
      User,
      { name: string; email: string; password: string }
    >({
      query: (userData) => ({
        url: "users/",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetFeaturedBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBookReviewsQuery,
  useSubmitReviewMutation,
  useGetUserReviewsQuery,
  useLoginMutation,
  useRegisterMutation,
} = api;
