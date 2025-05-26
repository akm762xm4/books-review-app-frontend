import { useGetFeaturedBooksQuery } from "../app/serverApi";
import { BookItem } from "../components/BookItem";
import { DisplayError } from "../components/DisplayError";
import { Loader } from "../components/Loader";
const Home = () => {
  const { data: books, isLoading, error } = useGetFeaturedBooksQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <DisplayError error={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Book Reviews</h1>
        <p className="text-xl text-gray-600">
          Discover and share your thoughts on your favorite books
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {books?.map((book) => (
          <BookItem key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
