import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSubmitReviewMutation } from "../app/serverApi";
import toast from "react-hot-toast";
import { getAuthUser } from "../app/useAuthState";

const ReviewForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [submitReview, { isLoading }] = useSubmitReviewMutation();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const authUser = getAuthUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !authUser) return;

    const review = {
      book: id,
      user: authUser._id,
      rating,
      comment,
    };

    try {
      await submitReview({
        bookId: id,
        review,
      }).unwrap();

      toast.success("Review submitted successfully!");
      navigate(`/books/${id}`);
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Write a Review</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rating
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`text-2xl focus:outline-none ${
                    value <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Review
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border-2 border-secondary rounded-lg outline-none"
              placeholder="Share your thoughts about this book..."
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/books/${id}`)}
              className="px-4 py-2 text-white bg-secondary/70 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2  bg-accent rounded hover:bg-accent/80 disabled:opacity-50"
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
