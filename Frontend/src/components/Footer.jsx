import React from "react";
import { Link } from "react-router";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Globe,
  Share2,
  AtSign,
  Link2,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-5 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-indigo-500">
              MyProperty
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-400">
              Discover your dream home with MyProperty. Buy, Rent, Sell and
              explore thousands of verified properties across India.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
                <Globe size={20} />
              </a>
              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-pink-600"
              >
                <Share2 size={20} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-sky-500"
              >
                <AtSign size={20} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-blue-600"
              >
                <Link2 size={20} />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link to="/" className="transition hover:text-indigo-400">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/properties"
                  className="transition hover:text-indigo-400"
                >
                  Properties
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="transition hover:text-indigo-400"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="transition hover:text-indigo-400"
                >
                  About Us
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <MapPin className="text-indigo-500" size={18} />
                <span>Raipur, Chhattisgarh, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-indigo-500" size={18} />
                <span>+91 6266976479</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-indigo-500" size={18} />
                <span>support@myproperty.com</span>
              </div>

            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Newsletter
            </h3>

            <p className="mb-5 text-sm text-gray-400">
              Subscribe to receive the latest property updates.
            </p>

            <div className="flex overflow-hidden rounded-lg border border-slate-700">

              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-slate-800 px-4 py-3 text-white placeholder:text-gray-400 outline-none"
              />

              <button className="bg-indigo-600 px-4 transition hover:bg-indigo-700">
                <Send size={20} />
              </button>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-6 text-center text-sm text-gray-400 md:flex-row">

          <p>
            © {new Date().getFullYear()} MyProperty. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5">

            <Link
              to="/privacy"
              className="transition hover:text-indigo-400"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-indigo-400"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/support"
              className="transition hover:text-indigo-400"
            >
              Support
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;