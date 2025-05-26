import { Link } from "react-router-dom";
import { useGetUserReviewsQuery } from "../app/serverApi";
import type { UserReview } from "../types";
import { getAuthUser } from "../app/useAuthState";

const UserProfile = () => {
  const authUser = getAuthUser();

  const {
    data: reviews,
    isLoading,
    error,
  } = useGetUserReviewsQuery(authUser?._id || "");

  if (!authUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please log in to view your profile
          </h2>
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !reviews) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          {error instanceof Error ? error.message : "Failed to load reviews"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2">
      <div className="max-w-2xl mx-auto">
        <div className="bg-secondary rounded-lg shadow-md p-4 mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl text-gray-500">
                {authUser?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {authUser.name}
              </h1>
              <p className="text-primary/80">{authUser.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Your Reviews</h2>
          {!reviews || reviews.length === 0 ? (
            <p className="text-gray-600">
              You haven't written any reviews yet.
            </p>
          ) : (
            <div className="space-y-4">
              {reviews?.map((review: UserReview) => (
                <div
                  key={review?._id}
                  className="border-b pb-4 last:border-b-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Link
                      to={`/books/${review?.book?._id}`}
                      className="text-accent hover:text-accent/80 font-bold"
                    >
                      {review?.book?.title}
                    </Link>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{review?.rating}/5</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{review?.comment}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
