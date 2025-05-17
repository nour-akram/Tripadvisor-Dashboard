import { Button, Offcanvas, Form, Row, Col } from "react-bootstrap";

export default function HotelFormModal({
  showModal,
  handleClose,
  handleChange,
  formData,
  handleSubmit,
  handleEditSubmit,
  destinations = [],
  // setFormData,
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
          {formData._id ? "Edit Hotel" : "Create a hotel"}
        </Offcanvas.Title>
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
          <Row>
            <Col md={6}>
              {/* Hotel Name */}
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Hotel Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              {/* Address */}
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
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              {/* Price Per Night */}
              <Form.Group className="mb-3" controlId="formPricePerNight">
                <Form.Label>Price Per Night</Form.Label>
                <Form.Control
                  type="number"
                  name="pricePerNight"
                  value={formData.pricePerNight || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location?.coordinates?.join(", ") || ""}
                  onChange={(e) => {
                    const coordinates = e.target.value
                      .split(",")
                      .map((coord) => coord.trim());
                    handleChange({
                      target: {
                        name: "location.coordinates",
                        value: coordinates,
                      },
                    });
                  }}
                  placeholder="e.g., Latitude, Longitude"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              {/* Hotel Style */}
              <Form.Group className="mb-3" controlId="formHotelStyle">
                <Form.Label>Hotel Style</Form.Label>
                <Form.Control
                  type="text"
                  name="hotelStyle"
                  value={formData.hotelStyle?.join(", ") || ""}
                  onChange={(e) => handleChange(e, "hotelStyle")}
                  placeholder="e.g., Luxury, Boutique"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              {/* Hotel Class */}
              <Form.Group className="mb-3" controlId="formHotelClass">
                <Form.Label>Hotel class</Form.Label>
                <Form.Select
                  name="hotelClass"
                  value={formData.hotelClass}
                  onChange={handleChange}
                >
                  <option value="">Select hotel class</option>
                  <option value="1-star">1 Star</option>
                  <option value="2-star">2 Star</option>
                  <option value="3-star">3 Star</option>
                  <option value="4-star">4 Star</option>
                  <option value="5-star">5 Star</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="rankingPosition">
                <Form.Label>Ranking Position</Form.Label>
                <Form.Control
                  type="number"
                  name="ranking.position"
                  value={formData.ranking?.position || ""}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "ranking.position",
                        value: parseInt(e.target.value, 10),
                      },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="rankingTotalHotels">
                <Form.Label>Total Hotels in Destination</Form.Label>
                <Form.Control
                  type="number"
                  name="ranking.totalHotels"
                  value={formData.ranking?.totalHotels || ""}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "ranking.totalHotels",
                        value: parseInt(e.target.value, 10),
                      },
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Description */}
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Languages Spoken */}
          <Form.Group className="mb-3" controlId="formLanguagesSpoken">
            <Form.Label>Languages Spoken</Form.Label>
            <Form.Control
              type="text"
              name="languagesSpoken"
              value={formData.languagesSpoken?.join(", ") || ""}
              onChange={(e) => handleChange(e, "languagesSpoken")}
              placeholder="e.g., English, French, Spanish"
            />
          </Form.Group>

          {/* Destination */}
          <Form.Group className="mb-3" controlId="formDestinationId">
            <Form.Label>Destination</Form.Label>
            <Form.Select
              name="destinationId"
              value={formData.destinationId}
              onChange={handleChange}
              required
            >
              <option value="">Where to?</option>
              {destinations?.length > 0 ? (
                destinations.map((dest) => (
                  <option key={dest._id} value={dest._id}>
                    {dest.name}
                  </option>
                ))
              ) : (
                <option disabled>No destinations available</option>
              )}
            </Form.Select>
          </Form.Group>

          {/* Add Room */}
          <div className="mb-3">
            <Form.Label>Add Room</Form.Label>
            {formData.rooms?.map((room, index) => (
              <div key={index} className="mb-3 border p-2">
                <Form.Label>Room {index + 1}</Form.Label>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    type="text"
                    name={`rooms[${index}].type`}
                    value={room.type}
                    onChange={(e) => {
                      const updatedRooms = [...formData.rooms];
                      updatedRooms[index].type = e.target.value;
                      handleChange({
                        target: { name: "rooms", value: updatedRooms },
                      });
                    }}
                    placeholder="e.g., Single, Double"
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Max Adults</Form.Label>
                      <Form.Control
                        type="number"
                        name={`rooms[${index}].maxAdults`}
                        value={room.maxAdults}
                        onChange={(e) => {
                          const updatedRooms = [...formData.rooms];
                          updatedRooms[index].maxAdults = parseInt(
                            e.target.value,
                            10
                          );
                          handleChange({
                            target: { name: "rooms", value: updatedRooms },
                          });
                        }}
                        placeholder="Max Adults"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Max Children</Form.Label>
                      <Form.Control
                        type="number"
                        name={`rooms[${index}].maxChildren`}
                        value={room.maxChildren}
                        onChange={(e) => {
                          const updatedRooms = [...formData.rooms];
                          updatedRooms[index].maxChildren = parseInt(
                            e.target.value,
                            10
                          );
                          handleChange({
                            target: { name: "rooms", value: updatedRooms },
                          });
                        }}
                        placeholder="Max Children"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  variant="danger"
                  onClick={() => {
                    const updatedRooms = formData.rooms.filter(
                      (_, i) => i !== index
                    );
                    handleChange({
                      target: { name: "rooms", value: updatedRooms },
                    });
                  }}
                  className="mt-2"
                >
                  Remove Room
                </Button>
              </div>
            ))}
            <Button
              variant="outline-secondary"
              onClick={() => {
                const newRoom = {
                  type: "",
                  maxAdults: 0,
                  maxChildren: 0,
                  bookedDates: [],
                };
                handleChange({
                  target: {
                    name: "rooms",
                    value: [...formData.rooms, newRoom],
                  },
                });
              }}
              className="mt-2"
            >
              Add another
            </Button>
          </div>

          {/* Image Upload (Placeholder - needs actual implementation) */}
          <div className="mb-3">
            <Button variant="outline-success" className="w-100">
              <i className="bi bi-upload me-2"></i>Upload Image
            </Button>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              style={{ background: "black", border: "none" }}
            >
              {formData._id ? "Update Hotel" : "Create Hotel"}
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
