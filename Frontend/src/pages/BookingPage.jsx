import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { bookPropertyAsync, propertyAsync } from "../Redux/propertySlice.js";
import Loading from "../components/Loading.jsx";
import { toast } from "react-toastify";
import { axiosInstance } from "../services/axiosInstance.js";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "+91 ",
    checkIn: "",
    checkOut: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const { id } = useParams();
  const dispatch = useDispatch();

  const { propertyData, isLoading } = useSelector(
    (store) => store.properties
  );

  useEffect(() => {
    dispatch(propertyAsync(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const navigate = useNavigate()
  const booking = async (e) => {
    e.preventDefault();

    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      toast.error("Check Out date must be greater than Check In date.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/property/book/${id}`,
        formData
      );
      if (!response.data.success) {
        return toast.warn(response.data.message);
      }

     toast.success(response.data.message);
      // Optional: Reset form
      navigate(`/property/${id}`)
  
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    }
  };
  const property = propertyData?.property;

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Property Card */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <img
            src={
              property?.propertyImages?.[0]
            }
            alt={property?.title}
            className="w-full h-72 object-cover"
          />

          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {property?.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {property?.address}, {property?.city}, {property?.state}
                </p>
              </div>

              <div className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold">
                ₹{property?.price}
                <span className="text-sm font-normal"> / month</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <h3 className="font-bold text-lg">{property?.bedrooms}</h3>
                <p className="text-sm text-gray-500">Bedrooms</p>
              </div>

              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <h3 className="font-bold text-lg">{property?.bathrooms}</h3>
                <p className="text-sm text-gray-500">Bathrooms</p>
              </div>

              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <h3 className="font-bold text-lg">{property?.area}</h3>
                <p className="text-sm text-gray-500">Sq Ft</p>
              </div>
            </div>

            <p className="mt-8 text-gray-600 leading-7">
              {property?.description}
            </p>
          </div>
        </div>

        {/* Booking Form */}

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Book Property
            </h2>

            <p className="text-gray-500 mt-2">
              Fill in your details to reserve this property.
            </p>
          </div>

          <form onSubmit={booking} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Full Name</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@gmail.com"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Check In</label>

              <input
                type="date"
                name="checkIn"
                min={today}
                value={formData.checkIn}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Check Out</label>

              <input
                type="date"
                name="checkOut"
                min={formData.checkIn || today}
                value={formData.checkOut}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-blue-50 rounded-2xl p-5">
              <div className="flex justify-between">
                <span>Rent</span>
                <span className="font-semibold">
                  ₹{property?.price}/month
                </span>
              </div>
            </div>

            <button
              type="submit"
              // disabled={bookingLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-4 rounded-xl disabled:bg-gray-400"
            >
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;