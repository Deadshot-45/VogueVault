import { useEffect } from "react";
import { Link } from "react-router-dom";

// MUI Components
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Components
import OtpVerification from "../Components/user/OtpVerification";
import { ToastContainer, toast } from "react-toastify/unstyled";

// Hooks
import UseSignInApi from "../Hooks/UseSignInApi";

const SignIn = () => {
  const { email, loading, isOtp, handleLogin, setIsOtp } = UseSignInApi();

  useEffect(() => {
    if (isOtp) {
      toast("OTP send Successfully");
    }
  }, [isOtp]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      username: form.email.value.trim(),
      password: form.password.value.trim(),
    };
    handleLogin(formData);
  };

  return (
    <>
      <ToastContainer />
      <section className="h-[63dvh] w-full flex flex-col gap-3 justify-center items-center">
        {isOtp && <OtpVerification email={email} setIsOtp={setIsOtp} />}
        {!isOtp && (
          <>
            <article className="flex items-center mx-auto gap-2">
              <h1 className="font-bold text-3xl font-mono text-zinc-800">
                SignIn
              </h1>
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
              <button
                type="submit"
                disabled={loading}
                className="bg-black py-2 px-4 text-white flex justify-center"
              >
                {!loading ? (
                  "Sign in"
                ) : (
                  <Box sx={{ display: "flex justify-center" }}>
                    <CircularProgress color="white" size={20} />
                  </Box>
                )}
              </button>
            </form>
          </>
        )}
      </section>
    </>
  );
};

export default SignIn;
