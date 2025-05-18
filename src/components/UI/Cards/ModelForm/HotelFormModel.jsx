import { Button, Offcanvas, Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function HotelFormModal({
  showModal,
  handleClose,
  handleChange,
  formData,
  handleSubmit,
  handleEditSubmit,
  setFormData,
  destinations = [],
}) {
  const [availableAmenities, setAvailableAmenities] = useState([]);
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await fetch("/api/feature");
        const data = await response.json();
        console.log("Fetched amenities:", data);
        setAvailableAmenities(data);
      } catch (err) {
        console.error("Failed to fetch amenities:", err);
      }
    };

    fetchAmenities();
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    ).then((base64Images) => {
      setFormData((prev) => {
        const newImages = [
          ...(Array.isArray(prev.images) ? prev.images : []),
          ...base64Images,
        ];
        console.log("New images loaded:", newImages);
        return {
          ...prev,
          images: newImages,
        };
      });
    });
  };

  const handleCommaSeparatedChange = (e, fieldName) => {
    const value = e.target.value;
    const arr = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    handleChange({
      target: {
        name: fieldName,
        value: arr,
      },
    });
  };

  const rooms = formData.rooms || [];
  const hotelStyle = formData.hotelStyle || [];
  const languagesSpoken = formData.languagesSpoken || [];
  const locationCoords = (formData.location &&
    formData.location.coordinates) || ["", ""];

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
                  value={formData.name || ""}
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
                  value={formData.address || ""}
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
              {/* Location (coordinates) */}

              <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location (Latitude, Longitude)</Form.Label>
                <Form.Control
                  type="text"
                  name="location.coordinates"
                  value={locationCoords.join(", ")}
                  onChange={(e) => {
                    const coords = e.target.value
                      .split(",")
                      .map((c) => c.trim());
                    handleChange({
                      target: {
                        name: "location.coordinates",
                        value: coords,
                      },
                    });
                  }}
                  placeholder="e.g., 40.7128, -74.0060"
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
                  value={hotelStyle.join(", ")}
                  onChange={(e) => handleCommaSeparatedChange(e, "hotelStyle")}
                  placeholder="e.g., Luxury, Boutique"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              {/* Hotel Class */}
              <Form.Group className="mb-3" controlId="formHotelClass">
                <Form.Label>Hotel Class</Form.Label>
                <Form.Select
                  name="hotelClass"
                  value={formData.hotelClass || ""}
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
              {/* Ranking Position */}
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
                        value: parseInt(e.target.value, 10) || 0,
                      },
                    })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              {/* Total Hotels in Destination */}
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
                        value: parseInt(e.target.value, 10) || 0,
                      },
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formAverageRating">
            <Form.Label>Average Rating</Form.Label>
            <Form.Control
              type="number"
              name="averageRating"
              value={formData.averageRating}
              min={0}
              max={5}
              step={0.1}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Languages Spoken */}
          <Form.Group className="mb-3" controlId="formLanguagesSpoken">
            <Form.Label>Languages Spoken</Form.Label>
            <Form.Control
              type="text"
              name="languagesSpoken"
              value={languagesSpoken.join(", ")}
              onChange={(e) => handleCommaSeparatedChange(e, "languagesSpoken")}
              placeholder="e.g., English, French, Spanish"
            />
          </Form.Group>

          {/* Destination */}
          <Form.Group className="mb-3" controlId="formDestinationId">
            <Form.Label>Destination</Form.Label>
            <Form.Select
              name="destinationId"
              value={formData.destinationId || ""}
              onChange={handleChange}
              required
            >
              <option value="">Where to?</option>
              {destinations.length > 0 ? (
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

          {/* Rooms */}
          <div className="mb-3">
            <Form.Label>Add Rooms</Form.Label>
            {rooms.map((room, index) => (
              <div key={index} className="mb-3 border p-2">
                <Form.Label>Room {index + 1}</Form.Label>

                <Form.Group className="mb-3">
                  <Form.Label>Room Number</Form.Label>
                  <Form.Control
                    type="text"
                    name={`rooms[${index}].roomNumber`}
                    value={room.roomNumber || ""}
                    onChange={(e) => {
                      const updatedRooms = [...rooms];
                      updatedRooms[index].roomNumber = e.target.value;
                      handleChange({
                        target: { name: "rooms", value: updatedRooms },
                      });
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Select
                    name={`rooms[${index}].type`}
                    value={room.type || ""}
                    onChange={(e) => {
                      const updatedRooms = [...rooms];
                      updatedRooms[index].type = e.target.value;
                      handleChange({
                        target: { name: "rooms", value: updatedRooms },
                      });
                    }}
                    required
                  >
                    <option value="">Select Type</option>
                    {["Single", "Double", "Suite", "Family", "Deluxe"].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      )
                    )}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name={`rooms[${index}].description`}
                    value={room.description || ""}
                    onChange={(e) => {
                      const updatedRooms = [...rooms];
                      updatedRooms[index].description = e.target.value;
                      handleChange({
                        target: { name: "rooms", value: updatedRooms },
                      });
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Max Adults</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    name={`rooms[${index}].maxAdults`}
                    value={room.maxAdults || 0}
                    onChange={(e) => {
                      const updatedRooms = [...rooms];
                      updatedRooms[index].maxAdults =
                        parseInt(e.target.value, 10) || 0;
                      handleChange({
                        target: { name: "rooms", value: updatedRooms },
                      });
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Max Children</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    name={`rooms[${index}].maxChildren`}
                    value={room.maxChildren || 0}
                    onChange={(e) => {
                      const updatedRooms = [...rooms];
                      updatedRooms[index].maxChildren =
                        parseInt(e.target.value, 10) || 0;
                      handleChange({
                        target: { name: "rooms", value: updatedRooms },
                      });
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Floor Number</Form.Label>
                  <Form.Control
                    type="number"
                    name={`rooms[${index}].floorNumber`}
                    value={room.floorNumber || 0}
                    onChange={(e) => {
                      const updatedRooms = [...rooms];
                      updatedRooms[index].floorNumber =
                        parseInt(e.target.value, 10) || 0;
                      handleChange({
                        target: { name: "rooms", value: updatedRooms },
                      });
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Room Size</Form.Label>
                  <Form.Control
                    type="text"
                    name={`rooms[${index}].roomSize`}
                    value={room.roomSize || ""}
                    onChange={(e) => {
                      const updatedRooms = [...rooms];
                      updatedRooms[index].roomSize = e.target.value;
                      handleChange({
                        target: { name: "rooms", value: updatedRooms },
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bed Type</Form.Label>
                  <Form.Control
                    type="text"
                    name={`rooms[${index}].bedType`}
                    value={room.bedType || ""}
                    onChange={(e) => {
                      const updatedRooms = [...rooms];
                      updatedRooms[index].bedType = e.target.value;
                      handleChange({
                        target: { name: "rooms", value: updatedRooms },
                      });
                    }}
                  />
                </Form.Group>
              </div>
            ))}

            <Button
              type="button"
              style={{ background: "black", border: "none" }}
              onClick={() => {
                handleChange({
                  target: {
                    name: "rooms",
                    value: [
                      ...rooms,
                      {
                        roomNumber: "",
                        type: "",
                        description: "",
                        maxAdults: 0,
                        maxChildren: 0,
                        floorNumber: 0,
                        roomSize: "",
                        bedType: "",
                        bookedDates: [],
                        _id: null,
                      },
                    ],
                  },
                });
              }}
            >
              Add Room
            </Button>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Upload Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLongDescription">
            <Form.Label>Long Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="longDescription"
              value={formData.longDescription || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formIsAvailable">
            <Form.Check
              type="checkbox"
              label="Is Available?"
              name="isAvaliable"
              checked={formData.isAvaliable}
              onChange={(e) =>
                handleChange({
                  target: { name: "isAvaliable", value: e.target.checked },
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCancellationDeadline">
            <Form.Label>Cancellation Deadline</Form.Label>
            <Form.Control
              type="date"
              name="cancellationDeadline"
              value={
                formData.cancellationDeadline
                  ? new Date(formData.cancellationDeadline)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "cancellationDeadline",
                    value: e.target.value,
                  },
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAmenities">
            <Form.Label>Amenities</Form.Label>
            <Row>
              {availableAmenities.map((amenity) => (
                <Col xs={6} key={amenity._id}>
                  <Form.Check
                    type="checkbox"
                    label={amenity.featureName}
                    checked={formData.amenities.includes(amenity._id)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...formData.amenities, amenity._id]
                        : formData.amenities.filter((id) => id !== amenity._id);
                      handleChange({
                        target: { name: "amenities", value: updated },
                      });
                    }}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>

          <Button type="submit" style={{ background: "black", border: "none" }}>
            {formData._id ? "Update Hotel" : "Create Hotel"}
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
