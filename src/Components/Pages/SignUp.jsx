import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataFile } from "../ContextFile/DataContext";

const SignUp = () => {
  const { user, setUser } = useContext(DataFile);
  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);
    console.log("Sign up button clicked");
  };
  return (
    <section className="h-[63dvh] w-full flex flex-col gap-3 justify-center items-center">
      <article className="flex items-center mx-auto gap-2">
        <h1 className="font-bold text-3xl font-mono text-zinc-800">SignUp</h1>
        <div className="border w-10"></div>
      </article>
      <form
        onSubmit={(e) => handleSignUp(e)}
        className="w-[350px] flex flex-col gap-2"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Enter full name..."
          className="border p-2"
        />
        <input
          type="tel"
          name="Mobilenumber"
          pattern="[0-9]{10}"
          placeholder="Enter number..."
          className="border p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email..."
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          className="border p-2"
        />
        <button type="submit" className="bg-black py-2 px-4 text-white">
          Sign Up
        </button>
      </form>
      <article className="flex flex-col justify-center items-center">
        <h1>Already have a account</h1>
        <button type="submit" className="bg-black py-2 px-3 text-sm text-white">
          <Link to={"/SignIn"}>Sign in</Link>
        </button>
      </article>
    </section>
  );
};

export default SignUp;
