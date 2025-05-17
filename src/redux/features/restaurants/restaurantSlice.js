import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/resturants");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createRestaurant = createAsyncThunk(
  'restaurants/createRestaurant',
  async (formData, thunkAPI) => {
    try {
      const response = await api.post('/resturants', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const deleteRestaurant = createAsyncThunk(
  "restaurants/deleteRestaurant",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/resturants/${id}`); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editRestaurant = createAsyncThunk(
  "restaurants/editRestaurant",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await api.patch(`/resturants/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload); 
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.data = state.data.filter((restaurant) => restaurant._id !== action.meta.arg);
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.error = action.payload;
      }) .addCase(editRestaurant.fulfilled, (state, action) => {
        const index = state.data.findIndex((restaurant) => restaurant._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload; 
        }
      })
      .addCase(editRestaurant.rejected, (state, action) => {
        state.error = action.payload;
        console.error("Edit restaurant failed:", action.payload);

      });
  },



});

export default restaurantSlice.reducer;
