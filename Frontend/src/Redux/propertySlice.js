import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../services/axiosInstance";
const initialState = {
    isLoading: true,
    propertyData: []
}
export const propertiesAsync = createAsyncThunk("/property/properties", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/property/properties");
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(propertiesAsync.pending, (state) => {
            state.isLoading = true;
        }).addCase(propertiesAsync.fulfilled, (state, action) => {
            state.isLoading = true;
            state.propertyData = action.payload;
        }).addCase(propertiesAsync.rejected, (state) => {
            state.isLoading = true;
        })
    }
})
export const properties = propertySlice.reducer