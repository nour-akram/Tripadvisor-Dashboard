import React, { useState, useEffect } from "react";
import "../../../../../pages/Destinations/DestinationForm/DestinationForm.css";
import "./AttractionForm.css";
import { FaTimes } from "react-icons/fa";

const AttractionForm = ({ onClose, onSubmit, initialData = null }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    minAge: "",
    maxAge: "",
    groupSize: "",
    duration: "",
    language: [],
    timeOfDay: "",
    category: "",
    productCategories: "",
    destination: "",
    accessabilty: "",
    images: null,
    rank: "",
    averageRating: "",
    totalReviews: "",
  });

  const [errors, setErrors] = useState({});
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        language: Array.isArray(initialData.language)
          ? initialData.language
          : [],
        productCategories: initialData.productCategories?.join(", ") || "",
        accessabilty: initialData.accessabilty?.join(", ") || "",
        images: null,
        rank: initialData.rank || "",
        averageRating: initialData.rating || "",
        totalReviews: initialData.reviewsCount || "",
        destination:
          initialData.destination?._id || initialData.destination || "",
      });
      if (initialData?.images?.length) {
        setExistingImages(initialData.images);
      }
      
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      language: checked
        ? [...prev.language, value]
        : prev.language.filter((lang) => lang !== value),
    }));
  };

  const validate = () => {
    const requiredFields = [
      "title",
      "description",
      "price",
      "minAge",
      "maxAge",
      "groupSize",
      "duration",
      "language",
      "timeOfDay",
      "category",
      "productCategories",
      "destination",
      "accessabilty",
      "rank",
      "averageRating",
      "totalReviews",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      const value = form[field];
      const isInvalid =
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0);

      if (isInvalid) {
        newErrors[field] = "This field is required.";
      }
    });

    if (
      form.averageRating &&
      (Number(form.averageRating) < 0 || Number(form.averageRating) > 5)
    ) {
      newErrors.averageRating = "Average rating must be between 0 and 5.";
    }

    if (form.totalReviews && Number(form.totalReviews) < 0) {
      newErrors.totalReviews = "Total reviews cannot be negative.";
    }

    const uploadedCount = form.images ? [...form.images].length : 0;
    const existingCount = initialData?.images?.length || 0;
    const total = uploadedCount + existingCount;

    if (!initialData && uploadedCount < 3) {
      newErrors.images = "Please upload at least 3 images.";
    }

    if (initialData && total < 3) {
      newErrors.images = "Total images must be at least 3.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();

    if (form.images) {
      for (const file of form.images) {
        formData.append("images", file);
      }
    }

    ["language", "accessabilty", "productCategories"].forEach((key) => {
      const value = form[key];
      const array = Array.isArray(value)
        ? value
        : value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean);
      formData.append(key, JSON.stringify(array));
    });

    [
      "title",
      "description",
      "price",
      "minAge",
      "maxAge",
      "groupSize",
      "duration",
      "timeOfDay",
      "category",
      "destination",
      "rank",
    ].forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append("rating", String(form.averageRating));
    formData.append("reviewsCount", String(form.totalReviews));

    if (existingImages.length > 0) {
      formData.append("existingImages", JSON.stringify(existingImages));
    }
    

    for (let [key, value] of formData.entries()) {
      console.log(`${key} =>`, value);
    }

    onSubmit(formData, initialData?._id);
  };
  
  return (
    <div className="form-drawer">
      <div className="form-header">
        <h4>{initialData ? "Edit Attraction" : "Add Attraction"}</h4>
        <button className="btn-close" onClick={onClose}>
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form-body">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && (
          <span className="text-danger small">{errors.title}</span>
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        {errors.description && (
          <span className="text-danger small">{errors.description}</span>
        )}

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        {errors.price && (
          <span className="text-danger small">{errors.price}</span>
        )}

        <input
          name="minAge"
          type="number"
          placeholder="Minimum Age"
          value={form.minAge}
          onChange={handleChange}
        />
        {errors.minAge && (
          <span className="text-danger small">{errors.minAge}</span>
        )}

        <input
          name="maxAge"
          type="number"
          placeholder="Maximum Age"
          value={form.maxAge}
          onChange={handleChange}
        />
        {errors.maxAge && (
          <span className="text-danger small">{errors.maxAge}</span>
        )}

        <input
          name="groupSize"
          type="number"
          placeholder="Group Size"
          value={form.groupSize}
          onChange={handleChange}
        />
        {errors.groupSize && (
          <span className="text-danger small">{errors.groupSize}</span>
        )}

        <input
          name="duration"
          type="number"
          placeholder="Duration (hours)"
          value={form.duration}
          onChange={handleChange}
        />
        {errors.duration && (
          <span className="text-danger small">{errors.duration}</span>
        )}

        <label className="mb-1">Languages:</label>
        <div className="checkbox-group">
          {["english", "arabic", "french", "german", "spanish"].map((lang) => (
            <label key={lang}>
              <input
                type="checkbox"
                value={lang}
                checked={form.language.includes(lang)}
                onChange={handleCheckboxChange}
              />
              {lang}
            </label>
          ))}
        </div>
        {errors.language && (
          <span className="text-danger small">{errors.language}</span>
        )}

        <select name="timeOfDay" value={form.timeOfDay} onChange={handleChange}>
          <option value="">Select Time of Day</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
        {errors.timeOfDay && (
          <span className="text-danger small">{errors.timeOfDay}</span>
        )}

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {[
            "adventure",
            "cultural",
            "historical",
            "culinary",
            "nature",
            "shopping",
            "beach",
            "nightlife",
            "wellness",
            "family",
          ].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-danger small">{errors.category}</span>
        )}

        <input
          name="productCategories"
          placeholder="Product Categories (comma separated)"
          value={form.productCategories}
          onChange={handleChange}
        />
        {errors.productCategories && (
          <span className="text-danger small">{errors.productCategories}</span>
        )}

        <input
          name="accessabilty"
          placeholder="Accessibility (comma separated)"
          value={form.accessabilty}
          onChange={handleChange}
        />
        {errors.accessabilty && (
          <span className="text-danger small">{errors.accessabilty}</span>
        )}

        <input
          name="destination"
          placeholder="Destination ID"
          value={form.destination}
          onChange={handleChange}
        />
        {errors.destination && (
          <span className="text-danger small">{errors.destination}</span>
        )}

        <input
          name="rank"
          type="number"
          placeholder="Rank"
          value={form.rank}
          onChange={handleChange}
        />
        {errors.rank && (
          <span className="text-danger small">{errors.rank}</span>
        )}

        <input
          name="averageRating"
          type="number"
          step="0.1"
          placeholder="Average Rating (0–5)"
          value={form.averageRating}
          onChange={handleChange}
        />
        {errors.averageRating && (
          <span className="text-danger small">{errors.averageRating}</span>
        )}

        <input
          name="totalReviews"
          type="number"
          placeholder="Total Reviews"
          value={form.totalReviews}
          onChange={handleChange}
        />
        {errors.totalReviews && (
          <span className="text-danger small">{errors.totalReviews}</span>
        )}

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
        {errors.images && (
          <span className="text-danger small">{errors.images}</span>
        )}
        {existingImages.length > 0 && (
          <div className="image-preview-list d-flex flex-wrap gap-3 mt-3">
            {existingImages.map((url, idx) => (
              <div key={idx} className="image-preview-item position-relative">
                <img
                  src={url}
                  alt={`Image ${idx + 1}`}
                  className="preview-img rounded border"
                />
                <FaTimes
                  className="delete-icon"
                  onClick={() => {
                    const updated = existingImages.filter((_, i) => i !== idx);
                    setExistingImages(updated);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="btn save mt-3 w-100">
          Save
        </button>
      </form>
    </div>
  );
};

export default AttractionForm;
