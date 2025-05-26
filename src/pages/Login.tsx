import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../app/serverApi";
import toast from "react-hot-toast";
import { setAuthUser } from "../app/useAuthState";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData)
        .unwrap()
        .then((data) => {
          setAuthUser(data);
        });
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className=" container mx-auto p-4">
      <div className=" max-w-md mx-auto bg-highlight/90 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-8 rounded-lg ">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-accent ">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
