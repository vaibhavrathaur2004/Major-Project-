import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaStore, FaMotorcycle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redex/features/userSlice';

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
  });

  const { name, email, password, phone, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/user/signup', formData, { withCredentials: true });
      dispatch(setUserData(res.data.data))
      navigate("/")
      // console.log(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  const roles = [
    { id: "user", label: "User", icon: <FaUser /> },
    { id: "owner", label: "Owner", icon: <FaStore /> },
    { id: "deliveryPartner", label: "Delivery", icon: <FaMotorcycle /> }
  ];

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200 px-4">
    <div className="backdrop-blur-lg bg-white/70 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md">
      
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Create Account 🚀
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Join us and get started
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-3 rounded-lg border border-gray-200 bg-white/80 focus:ring-2 focus:ring-orange-400 outline-none transition"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full p-3 rounded-lg border border-gray-200 bg-white/80 focus:ring-2 focus:ring-orange-400 outline-none transition"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 rounded-lg border border-gray-200 bg-white/80 focus:ring-2 focus:ring-orange-400 outline-none transition"
          required
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-3 rounded-lg border border-gray-200 bg-white/80 focus:ring-2 focus:ring-orange-400 outline-none transition"
          required
        />

        {/* Role Selection */}
        
        <div>
          <p className="font-medium text-gray-700 mb-2">Select your role</p>

          <div className="flex gap-3 flex-wrap justify-between">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleSelect(r.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all
                ${
                  role === r.id
                    ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <span className="text-base">{r.icon}</span>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-lg font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Sign Up
        </button>

        {/* Link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-medium hover:underline">
            Login
          </Link>
        </p>

        <p className="text-xs text-gray-400 text-center mt-2">
          By signing up, you agree to our Terms & Privacy Policy
        </p>

      </form>
    </div>
  </div>
  );
};

export default Signup;
