import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";


export const fetchAttractions = createAsyncThunk(
  "attractions/fetchAttractions",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/attractives");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createAttraction = createAsyncThunk(
  "attractions/createAttraction",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/attractives", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAttraction = createAsyncThunk(
  "attractions/updateAttraction",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await api.patch(`/attractives/${id}`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteAttraction = createAsyncThunk(
  "attractions/deleteAttraction",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/attractives/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

////////////////////////////////////////////////////////////////////////////////////////////////


const attractionSlice = createSlice({
  name: "attractions",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttractions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttractions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAttractions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createAttraction.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })
      .addCase(createAttraction.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateAttraction.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateAttraction.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteAttraction.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteAttraction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default attractionSlice.reducer;
