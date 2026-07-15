import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../services/axiosInstance";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
function Verify() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { phone } = useParams();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        `/user/verify/${phone}`,
        data
      );
      toast.success(response.data.message);
      const isverified = response.data.isExist.isPhoneVerified
      if (isverified) {
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);
  const handleResendOtp = async () => {
    try {
      const response = await axiosInstance.post(`/user/resend/${phone}`)
      setTimer(30);
      setCanResend(false);
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">

        {/* Brand */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600">
            MyProperty
          </h1>

          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            OTP Verification
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            We've sent a verification code to your registered phone number.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
        >
          {/* OTP */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Enter OTP
            </label>

            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Enter a valid 6-digit OTP",
                },
              })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-2xl tracking-[10px] font-semibold outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            {errors.otp && (
              <p className="mt-2 text-sm text-red-500">
                {errors.otp.message}
              </p>
            )}
          </div>

          {/* Verify Button */}

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
          >
            Verify OTP
          </button>
        </form>

        {/* Resend */}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-3">
            Didn't receive the OTP?
          </p>

          <button
            type="button"
            disabled={!canResend}
            onClick={handleResendOtp}
            className={`rounded-lg px-6 py-2 font-semibold transition-all duration-300 ${canResend
                ? "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            {canResend
              ? "Resend OTP"
              : `Resend in 00:${timer.toString().padStart(2, "0")}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verify;