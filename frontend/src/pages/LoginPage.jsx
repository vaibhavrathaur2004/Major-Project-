import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redex/features/userSlice';

const Login = () => {
  const navigate = useNavigate()
  const [email ,setEmail] = useState("");
  const [password,setPassword] = useState("");
 
  const dispatch = useDispatch()

  const data ={
    email,
    password
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/user/login', data, {
        withCredentials: true,
      });
      dispatch(setUserData(res.data.data))
      navigate("/", { replace: true });
      // console.log(res.data.data);
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200 px-4">
      <div className="backdrop-blur-lg bg-white/70 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 rounded-lg border border-gray-200 bg-white/80 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 rounded-lg border border-gray-200 bg-white/80 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-lg font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transition-all duration-200"
          >
            Login
          </button>

          {/* Links */}
          <div className="flex justify-between text-sm text-gray-500">
            <Link to="/signup" className="hover:text-orange-500 transition">
              Create account
            </Link>
            <span className="cursor-pointer hover:text-orange-500">
              Forgot password?
            </span>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            By logging in, you agree to our Terms & Privacy Policy
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
