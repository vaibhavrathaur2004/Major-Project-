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
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none "
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none"
            required
          />
          

          <button
            type="submit"
            className="w-full bg-[#FF5200] text-white p-3 rounded font-semibold hover:bg-[#FF5900] transition mt-4"
          >
            Login
          </button>
          <Link to="/signup"> signup</Link>
          <p className="text-xs text-gray-500 mt-2">
            By creating an account, I accept the Terms & Conditions & Privacy Policy
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
