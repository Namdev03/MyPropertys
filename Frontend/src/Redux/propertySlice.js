import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../services/axiosInstance";
const initialState = {
    isLoading: true,
    propertiesData: [],
    propertyData:null,
}
//=====Get All properties =====
export const propertiesAsync = createAsyncThunk("/property/properties", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/property/properties");
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
//=====Get property =====
export const propertyAsync = createAsyncThunk('/property/property/:id',async (id,{rejectWithValue}) => {
    try {
         const response = await axiosInstance.get(`/property/property/${id}`);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
//=====Book property =====
export const bookPropertyAsync = createAsyncThunk(
  "property/bookProperty",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/property/book/${id}`,
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(propertiesAsync.pending, (state) => {
            state.isLoading = true;
        }).addCase(propertiesAsync.fulfilled, (state, action) => {
            state.isLoading = true;
            state.propertiesData = action.payload;
        }).addCase(propertiesAsync.rejected, (state) => {
            state.isLoading = true;
        }).addCase(propertyAsync.pending, (state) => {
            state.isLoading = true;
        }).addCase(propertyAsync.fulfilled, (state,action) => {
            state.isLoading = false;
            state.propertyData = action.payload
        }).addCase(propertyAsync.rejected, (state) => {
            state.isLoading = false;
        })
    }
})
export const properties = propertySlice.reducer