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
        </Offcanvas.Title>{" "}
      </Offcanvas.Header>
      <Offcanvas.Body>
           <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (formData._id) {
              handleEditSubmit(formData._id, formData); 
            } else {
              handleSubmit(e); 
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

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
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
              type="text"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
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

          {/* Images */}
          <Form.Group className="mb-3" controlId="formRestaurantImages">
            <Form.Label>Restaurant Images (comma-separated URLs)</Form.Label>
            <Form.Control
              type="text"
              name="restaurantImages"
              value={formData.images.restaurantImages.join(", ")}
              onChange={(e) => handleChange(e, "images.restaurantImages")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMenuImages">
            <Form.Label>Menu Images (comma-separated URLs)</Form.Label>
            <Form.Control
              type="text"
              name="menuImages"
              value={formData.images.menuImages.join(", ")}
              onChange={(e) => handleChange(e, "images.menuImages")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formInteriorImages">
            <Form.Label>Interior Images (comma-separated URLs)</Form.Label>
            <Form.Control
              type="text"
              name="interiorImages"
              value={formData.images.interiorImages.join(", ")}
              onChange={(e) => handleChange(e, "images.interiorImages")}
            />
          </Form.Group>

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
