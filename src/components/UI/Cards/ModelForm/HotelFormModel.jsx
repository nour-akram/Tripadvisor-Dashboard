import { Button, Offcanvas, Form } from "react-bootstrap";

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
          {formData._id ? "Edit Hotel" : "Add Hotel"}
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
          {/* Name */}
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

          {/* Description */}
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Long Description */}
          <Form.Group className="mb-3" controlId="formLongDescription">
            <Form.Label>Long Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Languages Spoken */}
          <Form.Group className="mb-3" controlId="formLanguagesSpoken">
            <Form.Label>Languages Spoken (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="languagesSpoken"
              value={formData.languagesSpoken?.join(", ") || ""}
              onChange={(e) => handleChange(e, "languagesSpoken")}
            />
          </Form.Group>

          {/* Images */}
          <Form.Group className="mb-3" controlId="formImages">
            <Form.Label>Images (comma-separated URLs)</Form.Label>
            <Form.Control
              type="text"
              name="images"
              value={formData.images?.join(", ") || ""}
              onChange={(e) => handleChange(e, "images")}
              placeholder="e.g., https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
          </Form.Group>

          {/* Price Per Night */}
          <Form.Group className="mb-3" controlId="formPricePerNight">
            <Form.Label>Price Per Night</Form.Label>
            <Form.Control
              type="number"
              name="pricePerNight"
              value={formData.pricePerNight}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="formEmailHotel">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="emailHotel"
              value={formData.emailHotel}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Contact */}
          <Form.Group className="mb-3" controlId="formContactHotel">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              name="contactHotel"
              value={formData.contactHotel}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Hotel Link */}
          <Form.Group className="mb-3" controlId="formHotelLink">
            <Form.Label>Hotel Link</Form.Label>
            <Form.Control
              type="url"
              name="HotelLink"
              value={formData.HotelLink}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Award */}
          <Form.Group className="mb-3" controlId="formAward">
            <Form.Label>Award</Form.Label>
            <Form.Control
              type="text"
              name="award"
              value={formData.award}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Location Coordinates */}
          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Location Coordinates (latitude, longitude)</Form.Label>
            <Form.Control
              type="text"
              name="location.coordinates"
              value={formData.location?.coordinates?.join(", ") || ""}
              onChange={(e) => {
                const coordinates = e.target.value
                  .split(",")
                  .map((coord) => parseFloat(coord.trim()));
                handleChange({
                  target: { name: "location.coordinates", value: coordinates },
                });
              }}
              placeholder="e.g., -50.666711, 68.75251"
              required
            />
          </Form.Group>

          {/* Hotel Style */}
          <Form.Group className="mb-3" controlId="formHotelStyle">
            <Form.Label>Hotel Styles (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="hotelStyle"
              value={formData.hotelStyle?.join(", ") || ""}
              onChange={(e) => handleChange(e, "hotelStyle")}
              placeholder="e.g., Luxury, Eco-Friendly"
              required
            />
          </Form.Group>

          {/* Cancellation Deadline */}
          <Form.Group className="mb-3" controlId="formCancellationDeadline">
            <Form.Label>Cancellation Deadline</Form.Label>
            <Form.Control
              type="date"
              name="cancellationDeadline"
              value={
                formData.cancellationDeadline
                  ? formData.cancellationDeadline.split("T")[0]
                  : ""
              }
              onChange={handleChange}
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
              <option value="">Select destination</option>
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

          {/* Amenities */}
          <Form.Group className="mb-3" controlId="formAmenities">
            <Form.Label>Amenities (comma-separated ObjectIds)</Form.Label>
            <Form.Control
              type="text"
              name="amenities"
              value={formData.amenities?.join(", ") || ""}
              onChange={(e) => handleChange(e, "amenities")}
              placeholder="e.g., 681b92679ba400f97672ea6f, 681b92679ba400f97672ea7f"
              required
            />
          </Form.Group>

          {/* Ranking */}
          <Form.Group className="mb-3" controlId="formRanking">
            <Form.Label>Ranking</Form.Label>
            <Form.Control
              type="number"
              name="ranking.position"
              value={formData.ranking.position}
              onChange={(e) => handleChange(e)}
              placeholder="Position"
            />
            <Form.Control
              type="number"
              name="ranking.totalHotels"
              value={formData.ranking.totalHotels}
              onChange={(e) => handleChange(e)}
              placeholder="Total Hotels"
            />
          </Form.Group>
          {/* Rooms */}
          <Form.Group className="mb-3" controlId="formRooms">
            <Form.Label>Rooms</Form.Label>
            {formData.rooms?.map((room, index) => (
              <div key={index} className="mb-3">
                <Form.Label>Room {index + 1}</Form.Label>
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
                  placeholder="Room Type (e.g., Single, Double)"
                  required
                />
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
              variant="primary"
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
            >
              Add Room
            </Button>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHotelStyle">
            <Form.Label>Hotel Styles (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="hotelStyle"
              value={formData.hotelStyle?.join(", ") || ""}
              onChange={(e) => handleChange(e, "hotelStyle")}
              placeholder="e.g., Luxury, Eco-Friendly"
              required
            />
          </Form.Group>
          {/* Hotel Class */}
          <Form.Group className="mb-3" controlId="formHotelClass">
            <Form.Label>Hotel Class</Form.Label>
            <Form.Select
              name="hotelClass"
              value={formData.hotelClass}
              onChange={handleChange}
              required
            >
              <option value="">Select hotel class</option>
              <option value="1-star">1 Star</option>
              <option value="2-star">2 Star</option>
              <option value="3-star">3 Star</option>
              <option value="4-star">4 Star</option>
              <option value="5-star">5 Star</option>
            </Form.Select>
          </Form.Group>
          {/* Price Per Night */}
          <Form.Group className="mb-3" controlId="formPricePerNight">
            <Form.Label>Price Per Night</Form.Label>
            <Form.Control
              type="number"
              name="pricePerNight"
              value={formData.pricePerNight || ""}
              onChange={handleChange}
              placeholder="Enter price per night"
              required
            />
          </Form.Group>
          {/* Submit Button */}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              style={{ background: "black", border: "none" }}
            >
              {formData._id ? "Update Hotel" : "Add Hotel"}
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
