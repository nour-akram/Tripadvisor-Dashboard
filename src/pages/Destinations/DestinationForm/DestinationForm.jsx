import React, { useState, useEffect } from "react";
import "./DestinationForm.css";

const DestinationForm = ({ onClose, onSubmit, initialData = null }) => {
  const [form, setForm] = useState({
    name: "",
    region: "",
    country: "",
    description: "",
    bestTimeToVisit: "",
    attractions: "",
    activities: "",
    images: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        attractions: initialData.attractions?.join(", ") || "",
        activities: initialData.activities?.join(", ") || "",
        images: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "images" && value) {
        for (const file of value) {
          formData.append("images", file);
        }
      } else if (["attractions", "activities"].includes(key)) {
        const array = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        formData.append(key, JSON.stringify(array));
      } else {
        formData.append(key, value);
      }
    });

    console.log("Submitting form data for ID:", initialData?._id);
    onSubmit(formData, initialData?._id);
  };
  
  return (
    <div className="form-drawer">
      <div className="form-header">
        <h4>{initialData ? "Edit Destination" : "Add Destination"}</h4>
        <button className="btn-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form-body">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="region"
          value={form.region}
          onChange={handleChange}
          placeholder="Region"
        />
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          name="bestTimeToVisit"
          value={form.bestTimeToVisit}
          onChange={handleChange}
          placeholder="Best Time to Visit"
        />
        <input
          name="attractions"
          value={form.attractions}
          onChange={handleChange}
          placeholder="Attractions (comma separated)"
        />
        <input
          name="activities"
          value={form.activities}
          onChange={handleChange}
          placeholder="Activities (comma separated)"
        />
        {/* <input name="images" type="file" multiple onChange={handleChange} /> */}

        <div className="custom-file-upload mb-3">
          <label htmlFor="imageUpload" className="upload-label">
            Choose Files
          </label>
          <input
            id="imageUpload"
            name="images"
            type="file"
            multiple
            onChange={handleChange}
            className="hidden-file-input"
          />
          <span className="file-name-preview">
            {form.images?.length > 0
              ? `${form.images.length} file(s) selected`
              : "No file chosen"}
          </span>
        </div>

        <button type="submit" className="btn save mt-3 w-100">
          Save
        </button>
      </form>
    </div>
  );
};

export default DestinationForm;
