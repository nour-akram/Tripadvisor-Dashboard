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
      const response = await api.get("/auth/admin/profile", {
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

export const editAdminProfile = createAsyncThunk(
  "admin/editProfile",
  async ({ userId, formData }, thunkAPI) => {
    try {
      const token = Cookies.get("admin_token");
      const response = await api.put(`/users/${userId}`, formData, {
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

export const makeUserAdmin = createAsyncThunk(
  "admin/makeUserAdmin",
  async (userId, thunkAPI) => {
    try {
      const token = Cookies.get("admin_token");
      const response = await api.put(
        `/users/${userId}/role`,
        { role: "admin" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  token: Cookies.get("admin_token") || null,
  isAuthenticated: !!Cookies.get("admin_token"),
  loading: false,
  error: null,
  profile: null,
  profileLoading: false,
  profileError: null,
  editLoading: false,
  editError: null,
  makeAdminLoading: false,
  makeAdminError: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
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
      })

      .addCase(editAdminProfile.pending, (state) => {
        state.editLoading = true;
        state.editError = null;
      })
      .addCase(editAdminProfile.fulfilled, (state, action) => {
        state.editLoading = false;
        state.profile = action.payload;
      })
      .addCase(editAdminProfile.rejected, (state, action) => {
        state.editLoading = false;
        state.editError = action.payload;
      })

      .addCase(makeUserAdmin.pending, (state) => {
        state.makeAdminLoading = true;
        state.makeAdminError = null;
      })
      .addCase(makeUserAdmin.fulfilled, (state) => {
        state.makeAdminLoading = false;
      })
      .addCase(makeUserAdmin.rejected, (state, action) => {
        state.makeAdminLoading = false;
        state.makeAdminError = action.payload;
      });
  },
});

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
