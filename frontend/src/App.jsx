import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import './App.css';
import Homepage from './pages/homepage';
import Msg from './Msg';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData } from './redex/features/userSlice';
import { setShopData } from './redex/features/ownerSlice'
import CreateShop from './pages/CreateShop';
import CreateItem from './pages/CreateItem';
import EditItemForm from './pages/EditItemForm';
import fetchShopInCity from './hooks/fetchShopInCity';
import useCurrentCity from './hooks/getCurrentCity';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import OrderPlace from './pages/OrderPlace';
import getMyOrders from './hooks/getMyOrdres';
import MyOrdres from './pages/MyOrdres';

const App = () => {
  useCurrentCity()
  fetchShopInCity()
  getMyOrders()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/auth/user/current", { withCredentials: true });

        dispatch(setUserData(res.data.data));
        console.log("user logged in", res.data.data);

      } catch (err) {
        console.log("User not logged in");
      }
    };
    const fetchShop = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/shop/my-shop", { withCredentials: true });

        dispatch(setShopData(res.data.data));
        console.log("shop data ", res.data.data);

      } catch (err) {
        console.log("shop not fetched successfully?", err);
      }
    };

    fetchShop();

    fetchUser();
  }, [dispatch]);

  // useEffect(() => {
  //   const apiKey = import.meta.env.VITE_GEOAPIKEY;

  //   navigator.geolocation.getCurrentPosition(
  //     async (pos) => {
  //       const { latitude, longitude } = pos.coords;

  //       const res = await axios.get(
  //         `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
  //       );

  //       console.log("response ye aaya hai", res.data.results[0].city);
  //     },
  //     (err) => {
  //       console.error("Location error:", err);
  //     }
  //   );
  // }, []);




  const user = useSelector(state => state.user.userData);
  // console.log("user data in store",user);

  return (

    <Routes>
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to={"/"} />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to={"/"} />} />

      
      <Route path="/" element={user ? <Homepage /> : <Navigate to={"/login"} />} />

      <Route path="/create-shop"element={user ? <CreateShop /> : <Navigate to="/login" />}/>
      <Route path="/add-item" element={<CreateItem />} />
      <Route path="/edit-item/:id" element={<EditItemForm />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/order-success" element={<OrderPlace />} />
      <Route path="/my-orders" element={<MyOrdres/>} />
    </Routes>

  );
};

export default App;
