import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import ownerReducre from "./features/ownerSlice"
import mapReducre from "./features/mapsllice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    owner:ownerReducre,
    map:mapReducre,
  },
});
