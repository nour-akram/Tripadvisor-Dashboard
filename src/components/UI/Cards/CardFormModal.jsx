import { Modal, Form, Button } from "react-bootstrap";

export default function CardFormModal({
  showModal,
  handleClose,
  handleSubmit,
  handleChange,
  formData,
  destinations,
  type,
}) {
  return (
    <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        animation={false}
        dialogClassName="slide-in-modal"
      >
        {" "}
        <Modal.Header closeButton>
          <Modal.Title>
            Create New {type === "hotel" ? "Hotel" : "Restaurant"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={`Enter ${type} name`}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              
              <Form.Group className="mb-3">
                <Form.Label>Destination ID</Form.Label>
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  as="select"
                  name="destinationId"
                  value={formData.destinationId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Destination</option>
                  {destinations.map((dest) => (
                    <option key={dest._id} value={dest._id}>
                      {dest.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={
                  type === "hotel"
                    ? "Enter location (latitude,longitude)"
                    : "Enter location"
                }
                required
              />
            </Form.Group>

            {type === "hotel" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel Class</Form.Label>
                  <Form.Control
                    type="text"
                    name="hotelClass"
                    value={formData.hotelClass}
                    onChange={handleChange}
                    placeholder="Enter hotel class (e.g., 5-star)"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
              />
              
                  <Form.Label>Languages Spoken</Form.Label>
                  <Form.Control
                    type="text"
                    name="languagesSpoken"
                    value={formData.languagesSpoken}
                    onChange={handleChange}
                    placeholder="Enter languages spoken (comma-separated)"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Images</Form.Label>
                  <Form.Control
                    type="text"
                    name="images"
                    value={formData.images}
                    onChange={handleChange}
                    placeholder="Enter image URLs (comma-separated)"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price Per Night</Form.Label>
                  <Form.Control
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    placeholder="Enter price per night"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel Style</Form.Label>
                  <Form.Control
                    type="text"
                    name="hotelStyle"
                    value={formData.hotelStyle}
                    onChange={handleChange}
                    placeholder="Enter hotel style (comma-separated)"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Destination ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="destinationId"
                    value={formData.destinationId}
                    onChange={handleChange}
                    placeholder="Enter destination ID"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Amenities</Form.Label>
                  <Form.Control
                    type="text"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    placeholder="Enter amenities (comma-separated)"
                    required
                  />
                </Form.Group>
              </>
            )}
            {type === "restaurant" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="Enter destination (e.g., Paris, France)"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Cuisines</Form.Label>
                  <Form.Control
                    type="text"
                    name="cuisines"
                    value={formData.cuisines}
                    onChange={handleChange}
                    placeholder="Enter cuisines (comma-separated)"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Meal Types</Form.Label>
                  <Form.Control
                    type="text"
                    name="mealTypes"
                    value={formData.mealTypes}
                    onChange={handleChange}
                    placeholder="Enter meal types (comma-separated)"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Special Diets</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialDiets"
                    value={formData.specialDiets}
                    onChange={handleChange}
                    placeholder="Enter special diets (comma-separated)"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Menu</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="menu"
                    value={formData.menu}
                    onChange={handleChange}
                    placeholder="Enter menu items (name|price|description;...)"
                    required
                  />
                  <Form.Text className="text-muted">
                    Format: name|price|description;name|price|description;...
                  </Form.Text>
                </Form.Group>
              </>
            )}

            <Button
              variant="primary"
              type="submit"
              style={{ background: "#00d084", border: "#00d084" }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
