import { configureStore } from "@reduxjs/toolkit";
import {auth} from "./authSlice.js"
import {user} from "./userSlice.js"
export const store = configureStore({
  reducer: {
     auth,
     user
  },
});