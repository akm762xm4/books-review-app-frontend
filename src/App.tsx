import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./app/store";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import UserProfile from "./pages/UserProfile";
import ReviewForm from "./pages/ReviewForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookManagement from "./pages/admin/BookManagement";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-primary">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/books/:id/review"
                element={
                  <PrivateRoute>
                    <ReviewForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/books"
                element={
                  <AdminRoute>
                    <BookManagement />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
