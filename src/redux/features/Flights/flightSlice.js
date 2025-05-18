// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../services/api";

// export const fetchFlights = createAsyncThunk(
//   "flights/fetchFlights",
//   async (_, thunkAPI) => {
//     try {
//       const response = await api.get("/flights");
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// const flightSlice = createSlice({
//   name: "flights",
//   initialState: {
//     data: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFlights.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFlights.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchFlights.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default flightSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getFlights } from "./flightService";
// import api from "../../../services/api";

// // Fetch all flights
// export const fetchFlights = createAsyncThunk("flights/fetchFlights", async () => {
//   return await getFlights();
// });

// // Create flight
// export const createFlight = createAsyncThunk(
//   "flights/createFlight",
//   async (flightData, thunkAPI) => {
//     try {
//       const response = await api.post("/flights", flightData);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Edit flight
// export const editFlight = createAsyncThunk(
//   "flights/editFlight",
//   async ({ id, updatedData }, thunkAPI) => {
//     try {
//       const response = await api.put(`/flights/${id}`, updatedData);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Delete flight
// export const deleteFlight = createAsyncThunk(
//   "flights/deleteFlight",
//   async (id, thunkAPI) => {
//     try {
//       const response = await api.delete(`/flights/${id}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// const flightsSlice = createSlice({
//   name: "flights",
//   initialState: {
//     data: [],
//     status: "idle",
//     error: null,
//     loading: false,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch
//       .addCase(fetchFlights.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchFlights.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = action.payload;
//       })
//       .addCase(fetchFlights.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })

//       // Create
//       .addCase(createFlight.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createFlight.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data.push(action.payload);
//       })
//       .addCase(createFlight.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Edit
//       .addCase(editFlight.fulfilled, (state, action) => {
//         const index = state.data.findIndex(
//           (flight) => flight._id === action.payload._id
//         );
//         if (index !== -1) {
//           state.data[index] = action.payload;
//         }
//       })
//       .addCase(editFlight.rejected, (state, action) => {
//         state.error = action.payload;
//       })

//       // Delete
//       .addCase(deleteFlight.fulfilled, (state, action) => {
//         state.data = state.data.filter(
//           (flight) => flight._id !== action.meta.arg
//         );
//       })
//       .addCase(deleteFlight.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export default flightsSlice.reducer;








import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFlights } from "./flightService";
import api from "../../../services/api";
import Cookies from "js-cookie";

// Helper function to check token
const getAuthHeaders = () => {
  const token = Cookies.get("admin_token"); // غيرت من authToken لـ admin_token
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Fetch all flights
export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async (_, thunkAPI) => {
    try {
      const response = await getFlights();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch flights");
    }
  }
);

// Create flight
export const createFlight = createAsyncThunk(
  "flights/createFlight",
  async (flightData, thunkAPI) => {
    try {
      const headers = getAuthHeaders();
      const response = await api.post("/flights", flightData, { headers });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Edit flight
export const editFlight = createAsyncThunk(
  "flights/editFlight",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const headers = getAuthHeaders();
      const response = await api.put(`/flights/${id}`, updatedData, { headers });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete flight
export const deleteFlight = createAsyncThunk(
  "flights/deleteFlight",
  async (id, thunkAPI) => {
    try {
      const headers = getAuthHeaders();
      const response = await api.delete(`/flights/${id}`, { headers });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchFlights.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch flights";
      })

      // Create
      .addCase(createFlight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFlight.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createFlight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit
      .addCase(editFlight.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (flight) => flight._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(editFlight.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteFlight.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (flight) => flight._id !== action.meta.arg
        );
      })
      .addCase(deleteFlight.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default flightsSlice.reducer;