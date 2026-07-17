import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Building2,
  Pencil,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../Redux/authSlice.js";
import { userProfileAsync } from "../Redux/userSlice.js";
import Loading from "../components/Loading.jsx";

export default function Profile() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { userData, isLoading } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(userProfileAsync());
  }, [dispatch, isLoggedIn]);

  if (isLoading) return <Loading />;

  const user = userData?.user;

  return (
    <div className="min-h-screen bg-slate-100 pb-10">
      {/* Cover */}
      <div
        className="h-60 w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')",
        }}
      />

      <div className="mx-auto -mt-24 max-w-7xl px-4">

        {/* Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

          {/* Top Section */}
          <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-end">

            {/* Image */}
            <img
              src={user?.profileImage}
              alt="profile"
              className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-xl"
            />

            {/* Name */}
            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-4xl font-bold text-slate-800">
                  {user?.fullName}
                </h1>

                <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  <ShieldCheck size={16} />
                  Verified
                </span>

              </div>

              <p className="mt-2 text-slate-500">
                Welcome back to MyProperty
              </p>

            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">

              <button className="rounded-xl bg-[#2F6844] px-6 py-3 text-white transition hover:bg-[#255437]">
                Edit Profile
              </button>

              <div className="relative">

                <button
                  onClick={() => setOpen(!open)}
                  className="rounded-xl border p-3 hover:bg-gray-100"
                >
                  <Settings />
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border bg-white shadow-xl">

                    <button className="flex w-full items-center gap-3 px-5 py-4 hover:bg-gray-100">
                      <Pencil size={18} />
                      Edit Profile
                    </button>

                    <button className="flex w-full items-center gap-3 px-5 py-4 hover:bg-gray-100">
                      <Settings size={18} />
                      Settings
                    </button>

                    <button
                      onClick={() => dispatch(logoutAsync())}
                      className="flex w-full items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                )}

              </div>

            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-5 px-8 pb-8 lg:grid-cols-4">

            <div className="rounded-2xl bg-slate-50 p-6 text-center shadow-sm transition hover:shadow-lg">
              <Building2 className="mx-auto mb-3 text-[#2F6844]" size={35} />
              <h2 className="text-3xl font-bold">
                {user?.booked?.length || 0}
              </h2>
              <p className="mt-2 text-gray-500">Booked</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 text-center shadow-sm transition hover:shadow-lg">
              <Heart className="mx-auto mb-3 text-red-500" size={35} />
              <h2 className="text-3xl font-bold">
                {user?.wishlist?.length || 0}
              </h2>
              <p className="mt-2 text-gray-500">Wishlist</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 text-center shadow-sm transition hover:shadow-lg">
              <ShieldCheck
                className="mx-auto mb-3 text-blue-500"
                size={35}
              />
              <h2 className="text-3xl font-bold">12</h2>
              <p className="mt-2 text-gray-500">Reviews</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 text-center shadow-sm transition hover:shadow-lg">
              <Mail className="mx-auto mb-3 text-amber-500" size={35} />
              <h2 className="text-lg font-bold">2026</h2>
              <p className="mt-2 text-gray-500">Member Since</p>
            </div>

          </div>

          {/* Personal Info */}
          <div className="border-t p-8">

            <h2 className="mb-8 text-2xl font-bold text-slate-800">
              Personal Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <div className="flex items-center gap-4 rounded-xl border p-5">
                <Mail className="text-[#2F6844]" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <h3>{user?.email}</h3>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border p-5">
                <Phone className="text-[#2F6844]" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <h3>{user?.phone}</h3>
                </div>
              </div>

              <div className="md:col-span-2 flex items-center gap-4 rounded-xl border p-5">
                <MapPin className="text-[#2F6844]" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <h3>{user?.address}</h3>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}