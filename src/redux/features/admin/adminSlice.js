import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import Cookies from "js-cookie";

export const adminLogin = createAsyncThunk(
  "admin/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/auth/admin/login", credentials);
      const token = response.data.token;

      Cookies.set("admin_token", token, { expires: 7 });

      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAdminProfile = createAsyncThunk(
  "admin/getProfile",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("admin_token");
      const response = await api.get("/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    token: Cookies.get("admin_token") || null,
    loading: false,
    error: null,
    isAuthenticated: !!Cookies.get("admin_token"),
    profile: null,
    profileLoading: false,
    profileError: null,
  },
  reducers: {
    adminLogout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove("admin_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null;
        state.isAuthenticated = false;
      })
      // admin profile
      .addCase(getAdminProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
      })
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      });
  },
});

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
