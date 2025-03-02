import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataFile } from "../ContextFile/DataContext";

const SignIn = () => {
  const { setUser, setIsLogin } = useContext(DataFile);
  const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);
    setUser(formData);
    setIsLogin(true);
    console.log("login sucessfull");
    navigate('/User:user')
  };
  return (
    <section className="h-[63dvh] w-full flex flex-col gap-3 justify-center items-center">
      <article className="flex items-center mx-auto gap-2">
        <h1 className="font-bold text-3xl font-mono text-zinc-800">SignIn</h1>
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
  );
};

export default SignIn;
