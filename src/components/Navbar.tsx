import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuthUser, removeAuthUser } from "../app/useAuthState";
import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const authUser = getAuthUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    removeAuthUser();
    navigate("/login");
  };

  return (
    <nav className="bg-secondary  shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-xl font-bold text-primary flex items-center gap-2"
          >
            <BookOpen className="w-8 h-8 text-accent stroke-2" /> BookReview
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-primary hover:text-secondary hover:bg-primary"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {authUser?.isAdmin && (
              <Link to="/admin/books" className="text-primary">
                Admin
              </Link>
            )}
            <Link to="/books" className="text-primary ">
              Books
            </Link>

            {authUser ? (
              <>
                <Link to="/profile" className="text-primary ">
                  Profile
                </Link>
                <button onClick={handleLogout} className="text-primary ">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-primary ">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-accent/80 hover:bg-accent text-secondary px-4 py-2 rounded-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/books"
              className="block text-primary "
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </Link>
            {authUser?.isAdmin && (
              <Link
                to="/admin/books"
                className="block text-primary "
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            {authUser ? (
              <>
                <Link
                  to="/profile"
                  className="block text-primary "
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-primary "
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-primary "
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-accent/80 hover:bg-accent text-secondary px-4 py-2 rounded-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
