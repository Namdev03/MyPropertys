import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logoutApi, meApi, signInApi, signUpApi } from "../services/authApi.js";
const initialState = {
  isLoading: true,
  isLoggedIn: false,
  userData: null,
}
//===== SignUp api======
export const signUpAsync = createAsyncThunk("/user/signup", async (payload, { rejectWithValue }) => {
  try {
    const response = await signUpApi(payload);
    return response
  } catch (error) {
    return rejectWithValue(error.response);
  }
});
//===== SignIn api======
export const signInAsync = createAsyncThunk('/user/signin', async (payload, { rejectWithValue }) => {
  try {
    const response = await signInApi(payload);
    return response
  } catch (error) {
    return rejectWithValue(error.response)
  }
});
//===== Me route api======
export const meAsync = createAsyncThunk('/user/me', async (_, { rejectWithValue }) => {
  try {
    const response = await meApi();
    return response
  } catch (error) {
    return rejectWithValue(error.response)
  }
});
//===== Logout api======
export const logoutAsync = createAsyncThunk('/user/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await logoutApi();
    return response;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpAsync.pending, (state) => {
      state.isLoading = true;
      state.isLoggedIn = false
    }).addCase(signUpAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.userData = action.payload;
    }).addCase(signUpAsync.rejected, (state) => {
      state.isLoading = true;
      state.isLoggedIn = false
    }).addCase(signInAsync.pending, (state) => {
      state.isLoading = true;
      state.isLoggedIn = false
    }).addCase(signInAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.userData = action.payload;
    }).addCase(signInAsync.rejected, (state) => {
      state.isLoading = true;
      state.isLoggedIn = false
    }).addCase(meAsync.pending, (state) => {
      state.isLoading = true;
      state.isLoggedIn = false;
    }).addCase(meAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = action.payload.success;
      state.userData = action.payload;
    }).addCase(meAsync.rejected, (state) => {
      state.isLoading = true;
      state.isLoggedIn = false;
    }).addCase(logoutAsync.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.userData = null;
      })

      .addCase(logoutAsync.rejected, (state) => {
        state.isLoading = false;
      })
  }
})
export const auth = authSlice.reducer