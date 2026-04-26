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
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg bg-gray-50  outline-none"
            required
          />

          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg bg-gray-50  outline-none"
            required
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border rounded-lg bg-gray-50  outline-none"
            required
          />

          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg bg-gray-50 outline-none"
            required
          />

          <p className="font-semibold text-gray-700">Select your role:</p>

          <div className="flex gap-4">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleSelect(r.id)}
                className={`flex-1 flex flex-col items-center p-3 rounded-xl border transition
                  ${role === r.id 
                    ? "bg-[#FF5200] text-white border-[#FF5200] shadow-md scale-[1.02]"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300"
                  }`}
              >
                <div className="text-xl mb-1">{r.icon}</div>
                <span className="font-semibold">{r.label}</span>
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF5200] text-white p-3 rounded-lg font-bold text-lg shadow-md active:scale-95 transition"
          >
            Sign Up
          </button>

          <div className="text-center">
            <Link to="/login" className="text-sm text-blue-600 underline">Already have an account? Login</Link>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            By signing up, you agree to our Terms & Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
