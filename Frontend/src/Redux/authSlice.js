import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInApi, signUpApi } from "../services/authApi.js";
const initialState = {
  isLoadding: true,
  isLoggedIn: false,
  userData: null,
}
export const signUpAsync = createAsyncThunk("/user/signup", async (payload, { rejectWithValue }) => {
  try {
    const response = await signUpApi(payload);
    return response
  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const signInAsync = createAsyncThunk('/user/signin', async (payload, { rejectWithValue }) => {
  try {
    const response = await signInApi(payload);
    return response
  } catch (error) {
    return rejectWithValue(error.response)
  }
})
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpAsync.pending, (state) => {
      state.isLoadding = true;
      state.isLoggedIn = false
    }).addCase(signUpAsync.fulfilled, (state, action) => {
      state.isLoadding = false;
      state.isLoggedIn = true;
      state.userData = action.payload;
    }).addCase(signUpAsync.rejected, (state) => {
      state.isLoadding = true;
      state.isLoggedIn = false
    }).addCase(signInAsync.pending, (state) => {
      state.isLoadding = true;
      state.isLoggedIn = false
    }).addCase(signInAsync.fulfilled, (state,action) => {
      state.isLoadding = false;
      state.isLoggedIn = true;
      state.userData = action.payload;
    }).addCase(signInAsync.rejected, (state) => {
      state.isLoadding = true;
      state.isLoggedIn = false
    })
  }
})
export const auth = authSlice.reducer