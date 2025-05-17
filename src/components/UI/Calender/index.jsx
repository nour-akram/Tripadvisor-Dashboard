import { useState, useEffect } from "react";
import { Calendar, Badge } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import "./style.css";
import BookingModal from "../ModalBookings";
import { fetchBookingsByDate } from "../../../redux/features/bookings/bookingSlice";

const CalendarBookings = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingsForDate, setBookingsForDate] = useState([]);

  const dispatch = useDispatch();

  const { bookedDates, bookingsByDate } = useSelector(
    (state) => state.bookings
  );

  const bookedDatesSet = new Set(bookedDates); // fast lookup

  const renderCell = (date) => {
    const formatted = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
    if (bookedDatesSet.has(formatted)) {
      return <Badge className="calendar-todo-item-badge" />;
    }
    return null;
  };

  const handleSelect = (date) => {
    const formatted = date.toLocaleDateString("en-CA");
    if (bookedDatesSet.has(formatted)) {
      setSelectedDate(date);
      dispatch(fetchBookingsByDate(formatted));
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedDate(null);
    setBookingsForDate([]);
  };

  // When bookingsByDate updates (after dispatch), show it
  useEffect(() => {
    if (showModal) {
      setBookingsForDate(bookingsByDate);
    }
  }, [bookingsByDate, showModal]);

  return (
    <div className="d-flex flex-column justify-content-between align-items-center bg-light shadow-sm rounded-4 pt-4">
      <h5 className="fw-semibold fs-6">Schedule of Bookings</h5>

      <div style={{ padding: "1rem" }}>
        <Calendar
          compact
          renderCell={renderCell}
          onSelect={handleSelect}
          style={{ width: 320 }}
        />
      </div>

      <BookingModal
        show={showModal}
        onClose={handleClose}
        date={selectedDate}
        bookings={bookingsForDate}
      />
    </div>
  );
};

export default CalendarBookings;
