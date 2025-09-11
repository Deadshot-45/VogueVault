import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../Context/AuthContext";
import useVerifyOtp from "../../Hooks/UseVerifyOtp";
import useResendOtp from "../../Hooks/UseResendOtp";
import { ToastContainer, toast } from "react-toastify";

const OtpVerification = ({ email, setIsOtp }) => {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = React.useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { handleVerifyOtp } = useVerifyOtp(
    setIsLoading,
    setError,
    setSuccess,
    setUser
  );
  const { resendOtp, resendMssg } = useResendOtp(setIsLoading, setSuccess);

  useEffect(() => {
    if (success) {
      toast(success);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
    if(resendMssg){
      toast(resendMssg);
    }
  }, [success, navigate,resendMssg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = email;
    handleVerifyOtp(otp, username, setIsLoggedIn);
  };

  const handleResendOtp = async () => {
    setError("");
    setSuccess("");
    const username = email;
    resendOtp(username);
  };

  return (
    <>
      <ToastContainer />
      <section className="h-[63dvh] w-full flex flex-col gap-3 justify-center items-center">
        <article className="flex items-center mx-auto gap-2">
          <h1 className="font-bold text-3xl font-mono text-zinc-800">
            OTP Verification
          </h1>
          <div className="border w-10"></div>
        </article>

        <form
          onSubmit={handleSubmit}
          className="w-[350px] max-xm:w-[90%] flex flex-col gap-2"
        >
          <div className="text-center mb-2">
            <p className="text-gray-600">
              Please enter the OTP sent to your email/mobile
            </p>
          </div>

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.slice(0, 6))}
            placeholder="Enter 6-digit OTP"
            className="border p-2 text-center text-2xl tracking-widest"
            maxLength="6"
            required
          />

          <button
            type="submit"
            className="bg-black py-2 px-4 text-white disabled:bg-gray-400"
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={handleResendOtp}
            className="text-sm text-gray-600 hover:text-black disabled:text-gray-400"
            disabled={isLoading}
          >
            Didn&apos;t receive OTP? Click to resend
          </button>
        </form>

        <article className="flex flex-col justify-center items-center mt-4">
          <button
            onClick={() => {
              navigate("/signin");
              setIsLoggedIn(false);
              setIsOtp(false);
            }}
            className="text-sm text-gray-600 hover:text-black"
          >
            Back to Sign In
          </button>
        </article>
      </section>
    </>
  );
};
OtpVerification.propTypes = {
  email: PropTypes.string.isRequired,
  setIsOtp: PropTypes.func.isRequired,
};

export default OtpVerification;
