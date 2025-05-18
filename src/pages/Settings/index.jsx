import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProfile,
  editAdminProfile,
} from "../../redux/features/admin/adminSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AdminEditUserProfile.css";

const AdminEditUserProfile = () => {
  const dispatch = useDispatch();
  const { profile, profileLoading, editLoading } = useSelector(
    (state) => state.admin
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        username: profile.username || "",
        email: profile.email || "",
        password: "", 
        role: profile.role || "",
        status: profile.status || "",
      });
      setPreview(profile.image || "/avatar.svg");
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile) return;

    let payload;

    if (image) {
      payload = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (val) payload.append(key, val);
      });
      payload.append("image", image);
    } else {
      payload = {};
      Object.entries(form).forEach(([key, val]) => {
        if (val) payload[key] = val;
      });
    }

    const resultAction = await dispatch(
      editAdminProfile({ userId: profile._id, formData: payload })
    );

    if (editAdminProfile.fulfilled.match(resultAction)) {
      dispatch(getAdminProfile());
      alert("Profile updated successfully");
    } else {
      alert(" Failed to update profile");
    }
  };

  if (profileLoading || !profile) {
    return (
      <div className="w-full text-center text-gray-500 p-6">
        Loading user data...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Edit Profile</h2>

      <div className="profile-wrapper">
        <div className="profile-left">
          <div className="avatar-upload">
            <label htmlFor="imageUpload">
              <img src={preview} alt="Avatar" />
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
              />
              <span className="edit-icon">✎</span>
            </label>
          </div>
        </div>

        <div className="profile-right">
          <div className="grid">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <input type="text" name="role" value={form.role} disabled />
            <input type="text" name="status" value={form.status} disabled />
          </div>
        </div>
      </div>

      <div className="profile-footer">
        <button type="submit" disabled={editLoading}>
          {editLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AdminEditUserProfile;
