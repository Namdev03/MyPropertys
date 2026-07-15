import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { pagePath } from "../Router/pagePaths";
import { useDispatch, useSelector } from "react-redux";
import { signInAsync } from "../Redux/authSlice";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);

  const nevigate = useNavigate()

  const onSubmit = async (payload) => {
    const data = { ...payload };
    // If user entered a phone number, add +91
    if (/^[6-9]\d{9}$/.test(data.emailOrPhone)) {
      data.emailOrPhone = `+91${data.emailOrPhone}`;
    }
    const response = await dispatch(signInAsync(data)).unwrap();
    if (!response.success) {
      toast.warning(response.message)
    }
    else {
    toast.success(response.message)
    }
    console.log(response);
    const phone = response.payload.phone;
    const isVerified = response.payload.isPhoneVerified
    if (!isVerified) {
      nevigate(`/verify/${phone}`)
    }
      nevigate('/')
    
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600">
            MyProperty
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome Back 👋
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Login to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email or Phone */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email or Phone with
            </label>

            <input
              type="text"
              placeholder="Enter email or phone"
              {...register("emailOrPhone", {
                required: "Email or Phone is required",
              })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            {errors.emailOrPhone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailOrPhone.message}
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

          {/* Forgot Password */}

          <div className="flex justify-end">
            <Link to={pagePath.FORGOTPASSWORD}
              type="button"
              className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition duration-300"
          >
            Sign In
          </button>
        </form>
        {/* Footer */}

        <p className="text-center text-gray-500 mt-8 text-sm">
          Don't have an account?
          <Link to={pagePath.SIGNUP}
            className="ml-2 text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Signin;