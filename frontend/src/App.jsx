import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import './App.css';
import Homepage from './pages/homepage';
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
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  useCurrentCity()
  fetchShopInCity()
  getMyOrders()
  const dispatch = useDispatch()
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/auth/user/current", { withCredentials: true });

        dispatch(setUserData(res.data.data));
        console.log("user logged in", res.data.data);

      } catch {
        console.log("User not logged in");
        dispatch(setUserData(null));
      }
      setAuthChecked(true);
    };
    const fetchShop = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/shop/my-shop", { withCredentials: true });

        dispatch(setShopData(res.data.data));
        console.log("shop data ", res.data.data);

      } catch (err) {
        console.log("shop not fetched successfully?", err);
        dispatch(setShopData(null));
      }
    };

    fetchShop();

    fetchUser();
  }, [dispatch]);

  

  const user = useSelector(state => state.user.userData);
  // console.log("user data in store",user);

  return (

    <Routes>
      <Route
        path="/signup"
        element={!authChecked ? null : (!user ? <Signup /> : <Navigate to="/" replace />)}
      />
      <Route
        path="/login"
        element={!authChecked ? null : (!user ? <Login /> : <Navigate to="/" replace />)}
      />

      <Route element={<ProtectedRoute user={user} authChecked={authChecked} />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/order-success" element={<OrderPlace />} />
        <Route path="/my-orders" element={<MyOrdres />} />
      </Route>

      <Route element={<ProtectedRoute user={user} authChecked={authChecked} roles={["owner"]} />}>
        <Route path="/create-shop" element={<CreateShop />} />
        <Route path="/add-item" element={<CreateItem />} />
        <Route path="/edit-item/:id" element={<EditItemForm />} />
      </Route>

      <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
    </Routes>

  );
};

export default App;
