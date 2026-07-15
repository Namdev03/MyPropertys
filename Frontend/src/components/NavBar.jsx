
import React, { useState } from "react";
import { Link } from "react-router";
import {
  Menu,
  X,
  Search,
} from "lucide-react";

 export function Navbar() {
  // Change this value from Redux/Auth Context
  const isLoggedIn = false;

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const profileImage =
    "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg";

  const handleSearch = () => {
    console.log(search);
    // Search Logic Here
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-indigo-600 tracking-wide"
        >
          MyProperty
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 font-medium text-gray-700 lg:flex">
          <li>
            <Link
              to="/"
              className="transition hover:text-indigo-600"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/properties"
              className="transition hover:text-indigo-600"
            >
              Properties
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="transition hover:text-indigo-600"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Search */}
        <div className="hidden lg:flex items-center gap-2">

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search properties..."
              className="w-72 rounded-full border border-gray-300 py-2 pl-4 pr-12 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />

            <button
              onClick={handleSearch}
              className="absolute right-1 top-1 rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-4 lg:flex">
          {!isLoggedIn ? (
            <>
              <Link
                to="/signin"
                className="rounded-lg border border-indigo-600 px-5 py-2 font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white shadow-md transition hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <img
              src={profileImage}
              alt="Profile"
              className="h-11 w-11 cursor-pointer rounded-full border-2 border-indigo-600 object-cover"
            />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="space-y-5 border-t bg-white px-5 py-6 shadow-xl lg:hidden">

          {/* Search */}
          <div className="flex items-center gap-2">

            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
            />

            <button
              onClick={handleSearch}
              className="rounded-lg bg-indigo-600 p-3 text-white hover:bg-indigo-700"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Navigation */}
          <ul className="space-y-4 font-medium text-gray-700">

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/properties">Properties</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

          </ul>

          {/* Auth Buttons */}

          {!isLoggedIn ? (
            <div className="flex gap-3">

              <Link
                to="/login"
                className="flex-1 rounded-lg border border-indigo-600 py-3 text-center font-semibold text-indigo-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="flex-1 rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white"
              >
                Sign Up
              </Link>

            </div>
          ) : (
            <div className="flex items-center gap-3">

              <img
                src={profileImage}
                alt="Profile"
                className="h-12 w-12 rounded-full border-2 border-indigo-600"
              />

              <div>
                <h2 className="font-semibold">Welcome</h2>
                <p className="text-sm text-gray-500">
                  View Profile
                </p>
              </div>

            </div>
          )}

        </div>
      )}
    </nav>
  );
}


import { Outlet } from "react-router";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <>
      <Navbar/>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default Layout;