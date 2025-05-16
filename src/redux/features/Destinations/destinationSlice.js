import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchDestinations = createAsyncThunk(
  "destinations/fetchDestinations",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/destination");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createDestination = createAsyncThunk(
  "destinations/createDestination",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/destination", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.destination;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateDestination = createAsyncThunk(
  "destinations/updateDestination",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await api.put(`/destination/${id}`, formData);
      return response.data.destination;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteDestination = createAsyncThunk(
  "destinations/deleteDestination",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/destination/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const destinationSlice = createSlice({
  name: "destinations",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDestination.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateDestination.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (dest) => dest._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteDestination.fulfilled, (state, action) => {
        state.data = state.data.filter((dest) => dest._id !== action.payload);
      });
  },
});

export default destinationSlice.reducer;
