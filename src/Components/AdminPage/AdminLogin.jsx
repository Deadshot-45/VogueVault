import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const AdminLoginIn = () => {
  const { setAdmin, setIsLoggedIn } = useContext(AuthContext);

  const Navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    const response = await makeApiCall(formData, toast);

    if (response.error === false) {
      setAdmin(response.data);
      setIsLoggedIn(response.token);
      toast("Login Successfull");
      setTimeout(() => {
        Navigate("/admin/dashboard");
      }, 2000);
    }
  };
  return (
    <>
      <ToastContainer />
      <header className="h-screen flex justify-center items-center">
        <section className="w-[400px] flex flex-col gap-3 justify-center items-center px-10 py-20 rounded-lg border">
          <article className="flex items-center mx-auto gap-2">
            <h1 className="font-bold text-3xl font-mono text-zinc-800">
              Admin SignIn
            </h1>
            <div className="border w-10"></div>
          </article>
          <form
            onSubmit={(e) => handleSignIn(e)}
            className="w-[350px] flex flex-col gap-2"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="border p-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="border p-2"
            />
            <div className="flex justify-between text-sm">
              <button className="">Forget password?</button>
              <button className="">
                <Link to={"/SignUp"}>Create account</Link>
              </button>
            </div>
            <button type="submit" className="bg-black py-2 px-4 text-white">
              Sign in
            </button>
          </form>
        </section>
      </header>
    </>
  );
};

export default AdminLoginIn;

import { API_URL } from "../../Hooks/useAdminApi";
import { toast, ToastContainer } from "react-toastify";

const makeApiCall = async (data, toast) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    toast(error.message || "Error");
    return null;
  }
};
