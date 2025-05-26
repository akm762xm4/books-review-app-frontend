import { useParams, Link } from "react-router-dom";
import { useGetBookQuery, useGetBookReviewsQuery } from "../app/serverApi";
import type { Review } from "../types";
import { getAuthUser } from "../app/useAuthState";
import { BookText } from "lucide-react";
import { DisplayError } from "../components/DisplayError";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const authUser = getAuthUser();
  const {
    data: book,
    isLoading: isLoadingBook,
    error: bookError,
  } = useGetBookQuery(id!);
  const {
    data: reviews,
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useGetBookReviewsQuery(id!);

  if (isLoadingBook || isLoadingReviews) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (bookError || !book) {
    return <DisplayError error={bookError} />;
  }

  if (reviewsError) {
    return <DisplayError error={reviewsError} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="border-y-4 border-accent rounded-lg shadow-2xl shadow-accent/30 overflow-hidden">
          <div className="md:flex p-4 bg-primary">
            <div className="md:w-1/3">
              <BookText className="w-full h-full text-highlight/80 object-cover" />
            </div>
            <div className="p-6 md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{book.averageRating}/5</span>
                <span className="text-gray-500 ml-2">
                  ({book.totalReviews} reviews)
                </span>
              </div>
              <p className="text-gray-700 mb-6">{book.description}</p>
              {authUser &&
                !reviews?.some(
                  (review) => review.user._id === authUser._id
                ) && (
                  <Link
                    to={`/books/${book._id}/review`}
                    className="inline-block bg-highlight  px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Write a Review
                  </Link>
                )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          {!reviews || reviews.length === 0 ? (
            <p className="text-gray-600">
              No reviews yet. Be the first to review this book!
            </p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review: Review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-gray-500">
                          {review.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{review.user.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{review.rating}/5</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
