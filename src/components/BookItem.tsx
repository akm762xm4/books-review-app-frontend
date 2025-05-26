import { Link } from "react-router-dom";
import type { Book } from "../types";
import { BookText } from "lucide-react";
interface BookItemProps {
  book: Book;
}
export const BookItem = ({ book }: BookItemProps) => {
  return (
    <div className="border-y-4 border-accent rounded-lg shadow-2xl shadow-accent/30 overflow-hidden p-4">
      <BookText className="w-full h-48 text-highlight/80  object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-4">by {book.author}</p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 mr-1">★</span>
          <span>{book.averageRating}/5</span>
          <span className="text-gray-500 ml-2">
            ({book.totalReviews} reviews)
          </span>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-3">{book.description}</p>
        <Link
          to={`/books/${book._id}`}
          className="inline-block bg-accent text-white px-4 py-2 rounded hover:bg-accent/80"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
