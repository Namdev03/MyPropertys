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
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../Redux/authSlice";
import { userProfileAsync } from "../Redux/userSlice.js";
import Loading from "../components/Loading.jsx";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const { userData, isLoading } = useSelector((store) => store.user)
  const { isLoggedIn } = useSelector((store) => store.auth)

  useEffect(() => {
    dispatch(userProfileAsync())
  }, [dispatch,isLoggedIn])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Profile Card */}

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          {/* Cover */}

          <div className="h-40 bg-gradient-to-r from-[#14213D] to-[#2F6844]" />

          <div className="relative px-6 pb-8">

            {/* Profile */}

            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-end">

              <img
                src={userData?.user?.profileImage}
                alt="Profile"
                className="-mt-20 h-40 w-40 rounded-full border-8 border-white object-cover shadow-lg"
              />

              <div className="flex-1 text-center lg:text-left">

                <h1 className="text-3xl font-bold text-gray-800">
                  {userData?.user?.fullName}
                </h1>

                <p className="mt-1 text-gray-500">
                  Welcome to MyProperty
                </p>

              </div>

              {/* Right Buttons */}

              <div className="flex items-center gap-3">
                <div className="relative">

                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 rounded-xl border px-4 py-3 hover:bg-gray-100"
                  >
                    <Settings size={18} />
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white shadow-xl border">

                      <button className="flex w-full items-center gap-3 px-5 py-3 hover:bg-[#b4c8bb]">

                        <Settings size={18} />

                        Settings

                      </button>
                      <button className="flex items-center gap-2 rounded-xl  px-5 py-3 text-black transition hover:bg-[#b4c8bb]">

                        <Pencil size={18} />

                        Edit Profile

                      </button>
                      <button onClick={() => dispatch(logoutAsync())} className="flex w-full items-center gap-3 px-5 py-3 text-red-600 hover:bg-[#b4c8bb]">

                        <LogOut size={18} />

                        Logout

                      </button>

                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* Info */}

            <div className="mt-10 grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl border p-6">

                <h2 className="mb-5 text-xl font-semibold">
                  Personal Information
                </h2>

                <div className="space-y-5">

                  <div className="flex items-center gap-4">

                    <Mail className="text-[#2F6844]" />

                    <span>{userData?.user?.email}</span>

                  </div>

                  <div className="flex items-center gap-4">

                    <Phone className="text-[#2F6844]" />

                    <span>{userData?.user?.phone}</span>

                  </div>

                  <div className="flex items-center gap-4">

                    <MapPin className="text-[#2F6844]" />

                    <span>{userData?.user?.address}</span>

                  </div>

                </div>

              </div>

              {/* Stats */}

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-2xl bg-[#14213D] p-8 text-center text-white shadow-lg">

                  <Building2
                    className="mx-auto mb-3"
                    size={35}
                  />

                  <h2 className="text-4xl font-bold">
                    {userData?.user?.booked}
                  </h2>

                  <p className="mt-2">
                    Booked Properties
                  </p>

                </div>

                <div className="rounded-2xl bg-[#2F6844] p-8 text-center text-white shadow-lg">

                  <Heart
                    className="mx-auto mb-3"
                    size={35}
                  />

                  <h2 className="text-4xl font-bold">
                    {userData?.user?.wishlist}
                  </h2>

                  <p className="mt-2">
                    Wishlist
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}