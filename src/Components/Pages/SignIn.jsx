import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);
    setUser(formData);
    localStorage.setItem("user", JSON.stringify({ ...formData, role: "user" }));
    setIsLoggedIn(true);
    navigate("/user/account", { replace: true });
  };

  return (
    <section className="h-[63dvh] w-full flex flex-col gap-3 justify-center items-center">
      <article className="flex items-center mx-auto gap-2">
        <h1 className="font-bold text-3xl font-mono text-zinc-800">SignIn</h1>
        <div className="border w-10"></div>
      </article>
      <form
        onSubmit={(e) => handleSignIn(e)}
        className="w-[350px] max-xm:w-[90%] flex flex-col gap-2"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="border p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="border p-2"
          required
        />
        <div className="flex justify-between text-sm">
          <button type="button">Forget password?</button>
          <button type="button">
            <Link to="/signup">Create account</Link>
          </button>
        </div>
        <button type="submit" className="bg-black py-2 px-4 text-white">
          Sign in
        </button>
      </form>
    </section>
  );
};

export default SignIn;
