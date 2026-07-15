import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userProfileApi } from "../services/userApi.js";

const initialState = {
  isLoading: false,
  userData: null,
  error: null,
};

// ===== User Profile Async =====
export const userProfileAsync = createAsyncThunk(
  "/user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userProfileApi();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response|| { message: "Something went wrong" }
      );
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfileAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      }).addCase(userProfileAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      }) .addCase(userProfileAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const user= userSlice.reducer;