import { useState } from "react";
import {
  useGetBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "../../app/serverApi";
import toast from "react-hot-toast";
import type { BookFormData } from "../../types";
import { Loader } from "../../components/Loader";
import { Pencil, Trash } from "lucide-react";
const initialFormData: BookFormData = {
  title: "",
  author: "",
  description: "",
  publishedYear: new Date().getFullYear(),
};

const BookManagement = () => {
  const { data: books, isLoading } = useGetBooksQuery();
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [formData, setFormData] = useState<BookFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateBook({ id: editingId, book: formData }).unwrap();
        toast.success("Book updated successfully!");
      } else {
        await createBook(formData).unwrap();
        toast.success("Book created successfully!");
      }
      setFormData(initialFormData);
      setEditingId(null);
    } catch (error) {
      toast.error("Operation failed. Please try again.");
    }
  };

  const handleEdit = (book: any) => {
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      publishedYear: book.publishedYear,
    });
    setEditingId(book.id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id).unwrap();
        toast.success("Book deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete book.");
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Book Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Book" : "Add New Book"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary/70 mb-1">
                Title
              </label>
              <input
                title="title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border-secondary border-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary/70 mb-1">
                Author
              </label>
              <input
                title="author"
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="w-full px-3 py-2 border-secondary border-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary/70 mb-1">
                Description
              </label>
              <textarea
                title="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border-secondary border-2 rounded-lg"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary/70 mb-1">
                Published Year
              </label>
              <input
                title="publishedYear"
                type="number"
                value={formData.publishedYear}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    publishedYear: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border-secondary border-2 rounded-lg"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80"
              >
                {editingId ? "Update Book" : "Add Book"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData(initialFormData);
                    setEditingId(null);
                  }}
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Book List</h2>
          <div className="space-y-4">
            {books?.map((book) => (
              <div
                key={book._id}
                className="bg-white shadow-2xl shadow-accent/20 border-x-2 border-accent p-4 rounded-lg flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold">{book.title}</h3>
                  <p className="text-gray-600">by {book.author}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    title="edit"
                    onClick={() => handleEdit(book)}
                    className="p-2 bg-highlight rounded-lg "
                  >
                    <Pencil className="w-6 h-6" />
                  </button>
                  <button
                    title="delete"
                    onClick={() => handleDelete(book._id)}
                    className="p-2 bg-accent  rounded-lg "
                  >
                    <Trash className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookManagement;
