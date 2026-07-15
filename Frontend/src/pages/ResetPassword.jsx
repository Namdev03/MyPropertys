import React from "react";
import { useForm } from "react-hook-form";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">

        {/* Brand */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600">
            MyProperty
          </h1>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Reset Password
          </h2>

          <p className="mt-2 text-gray-500 text-sm leading-6">
            Enter the 6-digit OTP sent to your registered phone number to
            continue resetting your password.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
        >
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              OTP Code
            </label>

            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Please enter a valid 6-digit OTP",
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

          {/* Submit Button */}

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
          >
            Verify OTP
          </button>
        </form>

        {/* Footer */}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the OTP?
          </p>

          <button
            type="button"
            className="mt-2 text-indigo-600 font-semibold hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;