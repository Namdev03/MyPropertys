import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"
import { pagePath } from "../Router/pagePaths";
import { axiosInstance } from "../services/axiosInstance";
import { toast } from "react-toastify";
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nevigate = useNavigate()
  const onSubmit = async (payload) => {
    try {
      const response = await axiosInstance.post("/user/phoneotp", payload);
      toast.success(response.data.message);
      navigate(`/resetpassword/${response.data.formattedPhone}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">

        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600">
            MyProperty
          </h1>

          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            Forgot Password
          </h2>

          <p className="mt-2 text-sm text-gray-500 leading-6">
            Enter your registered phone number to receive an OTP for resetting
            your password.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Phone Number */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            {errors.phone && (
              <p className="mt-2 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
          >
            Send OTP
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Remember your password?
          </p>

          <Link to={pagePath.SIGNIN}
            type="button"
            className="mt-2 text-indigo-600 font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;