import { IoClose } from "react-icons/io5";
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
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title">Bookings on {date?.toDateString()}</h5>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="btn border-0 bg-transparent fs-4"
            >
              <IoClose />
            </button>
          </div>
          <div className="modal-body ">
            {bookings.length === 0 ? (
              <p>No bookings found for this date.</p>
            ) : (
              bookings.map((item, index) => (
                <div
                  key={index}
                  className="booking-card p-4 mb-4 border rounded shadow-sm bg-white"
                  style={{ borderLeft: "4px solid green" }}
                >
                  <div className="mb-2">
                    <h6 className="mb-1 text-success fw-bold">
                      {item.leadTraveler?.firstName}{" "}
                      {item.leadTraveler?.lastName}
                    </h6>
                    {item.traveler2?.firstName && (
                      <small className="text-muted">
                        + {item.traveler2?.firstName} {item.traveler2?.lastName}
                      </small>
                    )}
                  </div>

                  <div className="mb-2">
                    <span className="fw-semibold text-dark">Type:</span>{" "}
                    {item.type}
                  </div>

                  <div className="mb-2">
                    <span className="fw-semibold text-dark">Reference:</span>{" "}
                    {item.reference?.name || item.reference?.title || "N/A"}
                  </div>

                  <div className="mb-2">
                    <span className="fw-semibold text-dark">Check-In:</span>{" "}
                    {new Date(item.checkIn).toLocaleDateString("en-GB")}
                  </div>

                  {item.checkOut && (
                    <div className="mb-0">
                      <span className="fw-semibold text-dark">Check-Out:</span>{" "}
                      {new Date(item.checkOut).toLocaleDateString("en-GB")}
                    </div>
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
