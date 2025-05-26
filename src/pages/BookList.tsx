import { useEffect, useState } from "react";
import { useGetBooksQuery } from "../app/serverApi";
import { BookItem } from "../components/BookItem";
import type { Book } from "../types";
import { DisplayError } from "../components/DisplayError";
import { Loader } from "../components/Loader";
const BookList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: books, isLoading, error } = useGetBooksQuery();
  const [filteredBooks, setFilteredBooks] = useState<Book[] | undefined>();

  useEffect(() => {
    let filtered = books;

    filtered = filtered?.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredBooks(filtered);
  }, [searchQuery, books]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <DisplayError error={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Browse Books</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search books by title and author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border-2 border-secondary rounded-lg outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks?.map((book) => (
          <BookItem key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
