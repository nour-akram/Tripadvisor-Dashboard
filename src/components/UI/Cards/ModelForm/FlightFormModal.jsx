// // import { Button, Offcanvas, Form, Row, Col } from "react-bootstrap";

// // export default function FlightFormModal({
// //   showModal,
// //   handleClose,
// //   handleChange,
// //   formData,
// //   handleSubmit,
// //   handleEditSubmit,
// //   destinations = [],
// // }) {
// //   return (
// //     <Offcanvas
// //       show={showModal}
// //       onHide={handleClose}
// //       placement="end"
// //       backdrop={true}
// //       scroll={true}
// //     >
// //       <Offcanvas.Header closeButton>
// //         <Offcanvas.Title>
// //           {formData._id ? "Edit Flight" : "Create a Flight"}
// //         </Offcanvas.Title>
// //       </Offcanvas.Header>
// //       <Offcanvas.Body>
// //         <Form
// //           onSubmit={(e) => {
// //             e.preventDefault();
// //             if (formData._id) {
// //               handleEditSubmit(formData._id, formData);
// //             } else {
// //               handleSubmit(e);
// //             }
// //           }}
// //         >
// //           <Row>
// //             <Col md={6}>
// //               <Form.Group className="mb-3" controlId="flightNumber">
// //                 <Form.Label>Flight Number</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   name="flightNumber"
// //                   value={formData.flightNumber || ""}
// //                   onChange={(e) => handleChange(e)}
// //                   required
// //                 />
// //               </Form.Group>
// //             </Col>
// //             <Col md={6}>
// //               <Form.Group className="mb-3" controlId="airline">
// //                 <Form.Label>Airline</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   name="airline"
// //                   value={formData.airline || ""}
// //                   onChange={(e) => handleChange(e)}
// //                   required
// //                 />
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           <Row>
// //             <Col md={6}>
// //               <Form.Group className="mb-3" controlId="origin.name">
// //                 <Form.Label>Origin</Form.Label>
// //                 <Form.Select
// //                   name="origin.name"
// //                   value={formData.origin?.name || ""}
// //                   onChange={(e) => {
// //                     const selectedDest = destinations.find(
// //                       (dest) => dest.name === e.target.value
// //                     );
// //                     handleChange({
// //                       target: {
// //                         name: "origin",
// //                         value: {
// //                           ...formData.origin,
// //                           name: e.target.value,
// //                           region: selectedDest?.region || "",
// //                           country: selectedDest?.country || "",
// //                           description: selectedDest?.description || "",
// //                           images: selectedDest?.images || [],
// //                           attractions: selectedDest?.attractions || [],
// //                           bestTimeToVisit: selectedDest?.bestTimeToVisit || "",
// //                           activities: selectedDest?.activities || [],
// //                         },
// //                       },
// //                     });
// //                   }}
// //                   required
// //                 >
// //                   <option value="">Select Origin</option>
// //                   {destinations.map((dest) => (
// //                     <option key={dest._id} value={dest.name}>
// //                       {dest.name}
// //                     </option>
// //                   ))}
// //                 </Form.Select>
// //               </Form.Group>
// //             </Col>
// //             <Col md={6}>
// //               <Form.Group className="mb-3" controlId="destination.name">
// //                 <Form.Label>Destination</Form.Label>
// //                 <Form.Select
// //                   name="destination.name"
// //                   value={formData.destination?.name || ""}
// //                   onChange={(e) => {
// //                     const selectedDest = destinations.find(
// //                       (dest) => dest.name === e.target.value
// //                     );
// //                     handleChange({
// //                       target: {
// //                         name: "destination",
// //                         value: {
// //                           ...formData.destination,
// //                           name: e.target.value,
// //                           region: selectedDest?.region || "",
// //                           country: selectedDest?.country || "",
// //                           description: selectedDest?.description || "",
// //                           images: selectedDest?.images || [],
// //                           attractions: selectedDest?.attractions || [],
// //                           bestTimeToVisit: selectedDest?.bestTimeToVisit || "",
// //                           activities: selectedDest?.activities || [],
// //                         },
// //                       },
// //                     });
// //                   }}
// //                   required
// //                 >
// //                   <option value="">Select Destination</option>
// //                   {destinations.map((dest) => (
// //                     <option key={dest._id} value={dest.name}>
// //                       {dest.name}
// //                     </option>
// //                   ))}
// //                 </Form.Select>
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           <Row>
// //             <Col md={6}>
// //               <Form.Group className="mb-3" controlId="departureDate">
// //                 <Form.Label>Departure Date</Form.Label>
// //                 <Form.Control
// //                   type="datetime-local"
// //                   name="departureDate"
// //                   value={formData.departureDate || ""}
// //                   onChange={(e) => handleChange(e)}
// //                   required
// //                 />
// //               </Form.Group>
// //             </Col>
// //             <Col md={6}>
// //               <Form.Group className="mb-3" controlId="arrivalDate">
// //                 <Form.Label>Arrival Date</Form.Label>
// //                 <Form.Control
// //                   type="datetime-local"
// //                   name="arrivalDate"
// //                   value={formData.arrivalDate || ""}
// //                   onChange={(e) => handleChange(e)}
// //                   required
// //                 />
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           <Row>
// //             <Col md={6}>
// //               <Form.Group className="mb-3" controlId="flightDuration">
// //                 <Form.Label>Flight Duration (hours)</Form.Label>
// //                 <Form.Control
// //                   type="number"
// //                   name="flightDuration"
// //                   value={formData.flightDuration || ""}
// //                   onChange={(e) => handleChange(e)}
// //                   required
// //                 />
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           {/* Added section for stops */}
// //           <Row>
// //             <Col md={6}>
// //               <Form.Group className="mb-3" controlId="numberOfStops">
// //                 <Form.Label>Number of Stops</Form.Label>
// //                 <Form.Control
// //                   type="number"
// //                   name="numberOfStops"
// //                   value={formData.numberOfStops || 0} 
// //                   onChange={(e) => handleChange(e)} 
// //                   min={0} 
// //                 />
// //               </Form.Group>
// //             </Col>
// //             <Col md={6}>
// //               <Form.Group className="mb-3" controlId="stopsLocation">
// //                 <Form.Label>Stops Locations</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   name="stopsLocation" 
// //                   value={formData.stopsLocation?.join(", ") || ""} 
// //                   onChange={(e) => {
// //                     const locations = e.target.value
// //                       .split(",")
// //                       .map((loc) => loc.trim())
// //                       .filter((loc) => loc);
// //                     handleChange({
// //                       target: { name: "stopsLocation", value: locations }, 
// //                     });
// //                   }}
// //                   placeholder="e.g., Dubai, Paris"
// //                 />
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           {/* Dynamic Seats Section */}
// //           <div className="mb-3">
// //             <Form.Label>Add Seats</Form.Label>
// //             {formData.seats?.map((seat, index) => (
// //               <div key={index} className="mb-3 border p-2">
// //                 <Form.Label>Seat {index + 1}</Form.Label>
// //                 <Row>
// //                   <Col md={6}>
// //                     <Form.Group className="mb-3">
// //                       <Form.Label>Seat Number</Form.Label>
// //                       <Form.Control
// //                         type="text"
// //                         name={`seats[${index}].seatNumber`}
// //                         value={seat.seatNumber || ""}
// //                         onChange={(e) => {
// //                           const updatedSeats = [...formData.seats];
// //                           updatedSeats[index].seatNumber = e.target.value;
// //                           handleChange({
// //                             target: { name: "seats", value: updatedSeats },
// //                           });
// //                         }}
// //                         required
// //                       />
// //                     </Form.Group>
// //                   </Col>
// //                   <Col md={6}>
// //                     <Form.Group className="mb-3">
// //                       <Form.Label>Seat Type</Form.Label>
// //                       <Form.Select
// //                         name={`seats[${index}].seatType`}
// //                         value={seat.seatType || ""}
// //                         onChange={(e) => {
// //                           const updatedSeats = [...formData.seats];
// //                           updatedSeats[index].seatType = e.target.value;
// //                           handleChange({
// //                             target: { name: "seats", value: updatedSeats },
// //                           });
// //                         }}
// //                         required
// //                       >
// //                         <option value="">Select Type</option>
// //                         <option value="Economy">Economy</option>
// //                         <option value="Business">Business</option>
// //                         <option value="First">First</option>
// //                       </Form.Select>
// //                     </Form.Group>
// //                   </Col>
// //                 </Row>
// //                 <Row>
// //                   <Col md={6}>
// //                     <Form.Group className="mb-3">
// //                       <Form.Label>Price</Form.Label>
// //                       <Form.Control
// //                         type="number"
// //                         name={`seats[${index}].price`}
// //                         value={seat.price || ""}
// //                         onChange={(e) => {
// //                           const updatedSeats = [...formData.seats];
// //                           updatedSeats[index].price = parseFloat(e.target.value);
// //                           handleChange({
// //                             target: { name: "seats", value: updatedSeats },
// //                           });
// //                         }}
// //                         required
// //                       />
// //                     </Form.Group>
// //                   </Col>
// //                   <Col md={6}>
// //                     <Form.Group className="mb-3">
// //                       <Form.Label>Currency</Form.Label>
// //                       <Form.Control
// //                         type="text"
// //                         name={`seats[${index}].currency`}
// //                         value={seat.currency || ""}
// //                         onChange={(e) => {
// //                           const updatedSeats = [...formData.seats];
// //                           updatedSeats[index].currency = e.target.value;
// //                           handleChange({
// //                             target: { name: "seats", value: updatedSeats },
// //                           });
// //                         }}
// //                         required
// //                       />
// //                     </Form.Group>
// //                   </Col>
// //                 </Row>
// //                 <Row>
// //                   <Col md={6}>
// //                     <Form.Group className="mb-3">
// //                       <Form.Label>Booked Seats</Form.Label>
// //                       <Form.Control
// //                         type="number"
// //                         name={`seats[${index}].bookedSeats`}
// //                         value={seat.bookedSeats || ""}
// //                         onChange={(e) => {
// //                           const updatedSeats = [...formData.seats];
// //                           updatedSeats[index].bookedSeats = parseInt(e.target.value, 10);
// //                           handleChange({
// //                             target: { name: "seats", value: updatedSeats },
// //                           });
// //                         }}
// //                       />
// //                     </Form.Group>
// //                   </Col>
// //                 </Row>
// //                 <Button
// //                   variant="danger"
// //                   onClick={() => {
// //                     const updatedSeats = formData.seats.filter((_, i) => i !== index);
// //                     handleChange({
// //                       target: { name: "seats", value: updatedSeats },
// //                     });
// //                   }}
// //                   className="mt-2"
// //                 >
// //                   Remove Seat
// //                 </Button>
// //               </div>
// //             ))}
// //             <Button
// //               variant="outline-secondary"
// //               onClick={() => {
// //                 const newSeat = {
// //                   seatNumber: "",
// //                   seatType: "",
// //                   price: 0,
// //                   currency: "",
// //                   bookedSeats: 0,
// //                 };
// //                 handleChange({
// //                   target: {
// //                     name: "seats",
// //                     value: [...formData.seats, newSeat],
// //                   },
// //                 });
// //               }}
// //               className="mt-2"
// //             >
// //               Add Another Seat
// //             </Button>
// //           </div>

// //           {/* Submit Button */}
// //           <div className="d-grid">
// //             <Button
// //               variant="primary"
// //               type="submit"
// //               style={{ background: "black", border: "none" }}
// //             >
// //               {formData._id ? "Update Flight" : "Create Flight"}
// //             </Button>
// //           </div>
// //         </Form>
// //       </Offcanvas.Body>
// //     </Offcanvas>
// //   );
// // }





import { Button, Offcanvas, Form, Row, Col } from "react-bootstrap";

// دالة لتحويل التاريخ لصيغة input
function formatDateForInput(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date - tzOffset).toISOString().slice(0, 16);
}

// دالة للحصول على اسم الوجهة من الـ ObjectId
function getDestinationName(id, destinations) {
  const dest = destinations.find((d) => d._id === id);
  return dest ? dest.name : "";
}

export default function FlightFormModal({
  showModal,
  handleClose,
  handleChange,
  formData,
  handleSubmit,
  handleEditSubmit,
  destinations = [],
}) {
  // معالجة قيمة origin والدestination للعرض في select
  const originValue =
    typeof formData.origin === "object"
      ? formData.origin?.name || ""
      : getDestinationName(formData.origin, destinations);

  const destinationValue =
    typeof formData.destination === "object"
      ? formData.destination?.name || ""
      : getDestinationName(formData.destination, destinations);

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
          {formData._id ? "Edit Flight" : "Create a Flight"}
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
              <Form.Group className="mb-3" controlId="flightNumber">
                <Form.Label>Flight Number</Form.Label>
                <Form.Control
                  type="text"
                  name="flightNumber"
                  value={formData.flightNumber || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="airline">
                <Form.Label>Airline</Form.Label>
                <Form.Control
                  type="text"
                  name="airline"
                  value={formData.airline || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="origin">
                <Form.Label>Origin</Form.Label>
                <Form.Select
                  name="origin.name"
                  value={originValue}
                  onChange={(e) => {
                    const selectedDest = destinations.find(
                      (dest) => dest.name === e.target.value
                    );
                    handleChange({
                      target: {
                        name: "origin",
                        value: {
                          ...formData.origin,
                          name: e.target.value,
                          region: selectedDest?.region || "",
                          country: selectedDest?.country || "",
                          description: selectedDest?.description || "",
                          images: selectedDest?.images || [],
                          attractions: selectedDest?.attractions || [],
                          bestTimeToVisit: selectedDest?.bestTimeToVisit || "",
                          activities: selectedDest?.activities || [],
                        },
                      },
                    });
                  }}
                  required
                >
                  <option value="">Select Origin</option>
                  {destinations.map((dest) => (
                    <option key={dest._id} value={dest.name}>
                      {dest.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="destination">
                <Form.Label>Destination</Form.Label>
                <Form.Select
                  name="destination.name"
                  value={destinationValue}
                  onChange={(e) => {
                    const selectedDest = destinations.find(
                      (dest) => dest.name === e.target.value
                    );
                    handleChange({
                      target: {
                        name: "destination",
                        value: {
                          ...formData.destination,
                          name: e.target.value,
                          region: selectedDest?.region || "",
                          country: selectedDest?.country || "",
                          description: selectedDest?.description || "",
                          images: selectedDest?.images || [],
                          attractions: selectedDest?.attractions || [],
                          bestTimeToVisit: selectedDest?.bestTimeToVisit || "",
                          activities: selectedDest?.activities || [],
                        },
                      },
                    });
                  }}
                  required
                >
                  <option value="">Select Destination</option>
                  {destinations.map((dest) => (
                    <option key={dest._id} value={dest.name}>
                      {dest.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="departureDate">
                <Form.Label>Departure Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="departureDate"
                  value={formatDateForInput(formData.departureDate)}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="arrivalDate">
                <Form.Label>Arrival Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="arrivalDate"
                  value={formatDateForInput(formData.arrivalDate)}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="flightDuration">
                <Form.Label>Flight Duration (hours)</Form.Label>
                <Form.Control
                  type="number"
                  name="flightDuration"
                  value={formData.flightDuration || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="numberOfStops">
                <Form.Label>Number of Stops</Form.Label>
                <Form.Control
                  type="number"
                  name="numberOfStops"
                  value={formData.numberOfStops || 0}
                  onChange={handleChange}
                  min={0}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="stopsLocation">
                <Form.Label>Stops Locations</Form.Label>
                <Form.Control
                  type="text"
                  name="stopsLocation"
                  value={
                    Array.isArray(formData.stopsLocation)
                      ? formData.stopsLocation.join(", ")
                      : ""
                  }
                  onChange={(e) => {
                    const locations = e.target.value
                      .split(",")
                      .map((loc) => loc.trim())
                      .filter((loc) => loc);
                    handleChange({
                      target: { name: "stopsLocation", value: locations },
                    });
                  }}
                  placeholder="e.g., Dubai, Paris"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mb-3">
            <Form.Label>Add Seats</Form.Label>
            {formData.seats?.map((seat, index) => (
              <div key={index} className="mb-3 border p-2">
                <Form.Label>Seat {index + 1}</Form.Label>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Seat Number</Form.Label>
                      <Form.Control
                        type="text"
                        name={`seats[${index}].seatNumber`}
                        value={seat.seatNumber || ""}
                        onChange={(e) => {
                          const updatedSeats = [...formData.seats];
                          updatedSeats[index].seatNumber = e.target.value;
                          handleChange({
                            target: { name: "seats", value: updatedSeats },
                          });
                        }}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Seat Type</Form.Label>
                      <Form.Select
                        name={`seats[${index}].seatType`}
                        value={seat.seatType || ""}
                        onChange={(e) => {
                          const updatedSeats = [...formData.seats];
                          updatedSeats[index] = {
                            ...updatedSeats[index],
                            seatType: e.target.value,
                          };
                          handleChange({
                            target: { name: "seats", value: updatedSeats },
                          });
                        }}
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="Economy">Economy</option>
                        <option value="Business">Business</option>
                        <option value="First">First</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name={`seats[${index}].price`}
                        value={seat.price || ""}
                        onChange={(e) => {
                          const updatedSeats = [...formData.seats];
                          updatedSeats[index].price = parseFloat(e.target.value);
                          handleChange({
                            target: { name: "seats", value: updatedSeats },
                          });
                        }}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Currency</Form.Label>
                      <Form.Control
                        type="text"
                        name={`seats[${index}].currency`}
                        value={seat.currency || ""}
                        onChange={(e) => {
                          const updatedSeats = [...formData.seats];
                          updatedSeats[index].currency = e.target.value;
                          handleChange({
                            target: { name: "seats", value: updatedSeats },
                          });
                        }}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Booked Seats</Form.Label>
                      <Form.Control
                        type="number"
                        name={`seats[${index}].bookedSeats`}
                        value={seat.bookedSeats || ""}
                        onChange={(e) => {
                          const updatedSeats = [...formData.seats];
                          updatedSeats[index].bookedSeats = parseInt(
                            e.target.value,
                            10
                          );
                          handleChange({
                            target: { name: "seats", value: updatedSeats },
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  variant="danger"
                  onClick={() => {
                    const updatedSeats = formData.seats.filter(
                      (_, i) => i !== index
                    );
                    handleChange({
                      target: { name: "seats", value: updatedSeats },
                    });
                  }}
                  className="mt-2"
                >
                  Remove Seat
                </Button>
              </div>
            ))}
            <Button
              variant="outline-secondary"
              onClick={() => {
                const newSeat = {
                  seatNumber: "",
                  seatType: "",
                  price: 0,
                  currency: "",
                  bookedSeats: 0,
                };
                handleChange({
                  target: {
                    name: "seats",
                    value: [...formData.seats, newSeat],
                  },
                });
              }}
              className="mt-2"
            >
              Add Another Seat
            </Button>
          </div>

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              style={{ background: "black", border: "none" }}
            >
              {formData._id ? "Update Flight" : "Create Flight"}
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}