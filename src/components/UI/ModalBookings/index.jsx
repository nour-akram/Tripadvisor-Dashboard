import React from "react";

const BookingModal = ({ show, onClose, date, bookings }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Bookings on {date?.toDateString()}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {bookings.length === 0 ? (
              <p>No bookings found for this date.</p>
            ) : (
              bookings.map((item, index) => (
                <div
                  key={index}
                  className="p-3 mb-3 border rounded shadow-sm bg-light"
                >
                  <p>
                    <strong>Lead Traveler:</strong>{" "}
                    {item.leadTraveler?.firstName} {item.leadTraveler?.lastName}
                  </p>
                  <p>
                    <strong>Traveler 2:</strong>{" "}
                    {item.traveler2?.firstName} {item.traveler2?.lastName}
                  </p>
                  <p>
                    <strong>Type:</strong> {item.type}
                  </p>
                  <p>
                    <strong>Reference:</strong>{" "}
                    {item.reference?.name || item.reference?.title || "N/A"}
                  </p>
                  <p>
                    <strong>Check-In:</strong>{" "}
                    {new Date(item.checkIn).toLocaleDateString("en-GB")}
                  </p>
                  {item.checkOut && (
                    <p>
                      <strong>Check-Out:</strong>{" "}
                      {new Date(item.checkOut).toLocaleDateString("en-GB")}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
