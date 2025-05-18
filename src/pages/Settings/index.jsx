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

  const [formErrors, setFormErrors] = useState({});
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
    setFormErrors((prev) => ({ ...prev, [name]: "" })); 
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

    const errors = {};
    const requiredFields = ["firstName", "lastName", "username", "email"];

    requiredFields.forEach((field) => {
      if (!form[field]?.trim()) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    if (form.password) {
      if (form.password.length < 10) {
        errors.password = "Password must be at least 10 characters";
      } else if (!/[!@#$%^&*]/.test(form.password)) {
        errors.password =
          "Password must contain at least one special character";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

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
      alert(" Profile updated successfully");
    } else {
      alert(" Failed to update profile");
    }
  };
  

  if (profileLoading || !profile) {
    return (
      <div className="text-center text-secondary py-5">
        Loading user data...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="profile-form container">
      <h2 className="text-center mb-4">Edit Profile</h2>

      <div className="row g-4">
        <div className="col-md-2 text-center">
          <div className="avatar-upload position-relative">
            <label htmlFor="imageUpload">
              <img
                src={preview}
                alt="Avatar"
                className="img-fluid rounded-circle"
              />
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

        <div className="col-md-10">
          <div className="row g-3">
            {["firstName", "lastName", "username", "email"].map((field) => (
              <div className="col-md-6" key={field}>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  className="form-control"
                />
                {formErrors[field] && (
                  <div className="text-danger small">{formErrors[field]}</div>
                )}
              </div>
            ))}

            <div className="col-md-6 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="form-control pe-5"
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: "pointer", color: "#666" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {formErrors.password && (
                <div className="text-danger small">{formErrors.password}</div>
              )}
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="role"
                value={form.role}
                disabled
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="status"
                value={form.status}
                disabled
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-end mt-4">
        <button
          type="submit"
          disabled={editLoading}
          className="btn btn-dark px-4 py-2"
        >
          {editLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AdminEditUserProfile;
