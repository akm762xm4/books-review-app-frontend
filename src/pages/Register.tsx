import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../app/serverApi";
import toast from "react-hot-toast";
import { setAuthUser } from "../app/useAuthState";
const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData)
        .unwrap()
        .then((data) => {
          setAuthUser(data);
        });
      toast.success("Registration successful! Please login.");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md  mx-auto bg-highlight/90 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-8 ">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 bg-primary/50 rounded-lg outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 bg-primary/50 rounded-lg outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-3 py-2 bg-primary/50 rounded-lg outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-accent/80 text-secondary rounded-lg hover:bg-accent disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-accent ">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
