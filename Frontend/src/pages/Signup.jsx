import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { pagePath } from "../Router/pagePaths.js";
import { useDispatch, useSelector } from "react-redux";
import { signUpAsync } from "../Redux/authSlice.js";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  //=====call  the signupAsyc for register=====
  const onSubmit = async (payload) => {
    try {
      const response = await dispatch(signUpAsync(payload)).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600">
            MyProperty
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Full Name */}

          <div>
            <label className="block text-sm font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", {
                required: "Full name is required",
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />

            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}

          <div>
            <label className="block text-sm font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}

          <div>
            <label className="block text-sm font-semibold mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter valid phone number",
                },
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          {/* Password */}

          <div>
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
                  },
                })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Button */}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}

        <div className="text-center mt-6">
          <span className="text-gray-500">
            Already have an account?
          </span>

          <Link to={pagePath.SIGNIN}
            className="ml-2 text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;