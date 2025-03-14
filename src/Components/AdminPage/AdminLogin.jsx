import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const AdminLoginIn = () => {
  const { setAdmin, setIsLoggedIn } = useContext(AuthContext);
  const Navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (
      formData.email === "admin@gmail.com" &&
      formData.password === "admin123"
    ) {
      setAdmin({ ...formData, role: "admin" });
      localStorage.setItem(
        "admin",
        JSON.stringify({ ...formData, role: "admin" })
      );
      setIsLoggedIn(true);
      Navigate("/admin");
    }
  };
  return (
    <header className="h-screen flex justify-center items-center">
      <section className="w-full flex flex-col gap-3 justify-center items-center px-10 py-20 rounded-lg border">
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
  );
};

export default AdminLoginIn;
