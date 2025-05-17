import { Button, Offcanvas, Form } from "react-bootstrap";

export default function RestaurantFormModal({
  showModal,
  handleClose,
  handleChange,
  formData,
  handleSubmit,
  destinations,
  setFormData,
  handleEditSubmit,
}) {
  const handleImageUpload = (e, imageCategory) => {
    const files = Array.from(e.target.files);

    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    ).then((base64Images) => {
      setFormData((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          [imageCategory]: [
            ...(prev.images[imageCategory] || []),
            ...base64Images,
          ], // append new images
        },
      }));
    });
  };

  return (
    <Offcanvas
      show={showModal}
      onHide={handleClose}
      placement="end"
      backdrop={true}
      scroll={true}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {formData._id ? "Edit Restaurant" : "Add Restaurant"}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (formData._id) {
              handleEditSubmit(formData._id, formData);
            } else {
              handleSubmit(e);
            }
          }}
        > */}

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (formData._id) {
              handleEditSubmit(formData._id, formData);
            } else {
              handleSubmit();
            }
          }}
        >
          {/* Basic Information */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Location Fields */}
          <Form.Group className="mb-3" controlId="formLocationAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="location.address"
              value={formData.location?.address || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLocationCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="location.city"
              value={formData.location?.city || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLocationCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="location.country"
              value={formData.location?.country || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDestination">
            <Form.Label>Destination</Form.Label>
            <Form.Select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            >
              <option value="">Select destination</option>
              {destinations.map((dest) => (
                <option key={dest._id} value={dest.name}>
                  {dest.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Latitude and Longitude */}
          <Form.Group className="mb-3" controlId="formLatitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLongitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Additional Fields */}
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formWebsite">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formHours">
            <Form.Label>Hours</Form.Label>
            <Form.Control
              as="textarea"
              name="hours"
              onChange={handleChange}
              rows={7}
              placeholder={`Monday: 11:00 AM - 3:00 PM, 5:00 PM - 10:00 PM\nTuesday: 11:00 AM - 3:00 PM, 5:00 PM - 10:00 PM\n...`}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRank">
            <Form.Label>Rank</Form.Label>
            <Form.Control
              type="number"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              placeholder="Enter rank"
              min="0"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={formData.rating || ""}
              onChange={handleChange}
              placeholder="Enter rating (0-5)"
              min="0"
              max="5"
              step="0.1"
            />
          </Form.Group>

          {/* Features */}
          <Form.Group className="mb-3" controlId="formCuisines">
            <Form.Label>Cuisines (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="cuisines"
              value={formData.features.cuisines.join(", ")}
              onChange={(e) => handleChange(e, "features.cuisines")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMealTypes">
            <Form.Label>Meal Types (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="mealTypes"
              value={formData.features.mealTypes.join(", ")}
              onChange={(e) => handleChange(e, "features.mealTypes")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSpecialDiets">
            <Form.Label>Special Diets (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="specialDiets"
              value={formData.features.specialDiets.join(", ")}
              onChange={(e) => handleChange(e, "features.specialDiets")}
            />
          </Form.Group>

          {/* Image Uploads */}
          {Object.keys(formData.images).map((key) => (
            <Form.Group className="mb-3" controlId={`form-${key}`} key={key}>
              <Form.Label>{key.replace(/([A-Z])/g, " $1")}</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e, key)}
              />
              <div className="mt-2 d-flex flex-wrap gap-2">
                {formData.images[key]?.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt=""
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                ))}
              </div>
            </Form.Group>
          ))}

          {/* Menu Items */}
          <Form.Group className="mb-3" controlId="formMenuItems">
            <Form.Label>Menu Items (name, description, price)</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="menu"
              value={formData.menu
                .map(
                  (item) => `${item.name}, ${item.description}, ${item.price}`
                )
                .join("\n")}
              onChange={(e) => {
                const menuItems = e.target.value.split("\n").map((item) => {
                  const parts = item.split(",").map((s) => s.trim());
                  if (parts.length !== 3) {
                    return { name: "", description: "", price: "" };
                  }
                  const [name, description, price] = parts;
                  return {
                    name: name || "",
                    description: description || "",
                    price: parseFloat(price) || 0,
                  };
                });
                setFormData((prev) => ({ ...prev, menu: menuItems }));
              }}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              style={{ background: "black", border: "none" }}
            >
              {formData._id ? "Update Restaurant" : "Add Restaurant"}
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
