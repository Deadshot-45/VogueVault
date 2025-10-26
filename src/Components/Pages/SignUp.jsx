import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify/unstyled";

const SignUp = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = (formData) => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !formData.confirm_password
    ) {
      throw new Error("All fields are required");
    }
    if (formData.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    if (formData.password !== formData.confirm_password) {
      throw new Error("Passwords do not match");
    }
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      throw new Error("Please enter a valid 10-digit mobile number");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      throw new Error("Please enter a valid email address");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const form = e.target;
      const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        mobile: form.mobile.value.trim(),
        password: form.password.value,
        confirm_password: form.confirm_password.value,
      };

      // Validate form data
      validateForm(formData);

      const response = await axios.post(
        "http://localhost:5500/api/data/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error === false) {
        // Signup successful
        console.log("Signup successful:", response.data.message);
        setSuccess(response.data.message);
        toast(response.data.message);
        setTimeout(() => {
          navigate("/signin"); // Redirect to sign in page after 3 seconds
          setSuccess("");
        }, 3000);
      } else {
        // Server returned an error
        setError(response.data.message);
        toast(response.data.message);
      }
    } catch (error) {
      // Handle network or server errors
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="h-[63dvh] w-full flex flex-col gap-3 justify-center items-center">
        <article className="flex items-center mx-auto gap-2">
          <h1 className="font-bold text-3xl font-mono text-zinc-800">SignUp</h1>
          <div className="border w-10"></div>
        </article>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative w-[350px] max-xm:w-[90%]">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative w-[350px] max-xm:w-[90%]">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSignUp}
          className="w-[350px] max-xm:w-[90%] flex flex-col gap-2"
        >
          <input
            type="text"
            name="name"
            placeholder="Enter full name..."
            className="border p-2"
            required
          />
          <input
            type="tel"
            name="mobile"
            pattern="[0-9]{10}"
            placeholder="Enter number..."
            className="border p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email..."
            className="border p-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password..."
            className="border p-2"
            minLength="8"
            required
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Enter password again..."
            className="border p-2"
            minLength="8"
            required
          />
          <button
            type="submit"
            className="bg-black py-2 px-4 text-white disabled:bg-gray-400"
            disabled={loading}
          >
            {!loading ? (
              "Sign Up"
            ) : (
              <Box sx={{ display: "flex justify-center" }}>
                <CircularProgress color="white" size={20} />
              </Box>
            )}
          </button>
        </form>

        <article className="flex flex-col justify-center items-center">
          <h1>Already have an account?</h1>
          <Link to="/signin" className="bg-black py-2 px-3 text-sm text-white">
            Sign in
          </Link>
        </article>
      </section>
    </>
  );
};

export default SignUp;
