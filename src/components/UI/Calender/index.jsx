import { useState } from "react";
import { Calendar, Badge } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./style.css";
import BookingModal from "../ModalBookings"; 

function getBookings(date) {
  if (!date) return [];

  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        { time: "10:30 am", title: "Meeting" },
        { time: "12:00 pm", title: "Lunch" }
      ];
    case 15:
      return [
        { time: "09:30 pm", title: "Intro Meeting" },
        { time: "12:30 pm", title: "Client entertaining" },
        { time: "02:00 pm", title: "Design discussion" },
        { time: "05:00 pm", title: "Testing" },
        { time: "06:30 pm", title: "Reporting" }
      ];
    default:
      return [];
  }
}

function renderCell(date) {
  const bookings = getBookings(date);
  return bookings.length > 0 ? (
    <Badge className="calendar-todo-item-badge" />
  ) : null;
}

const CalendarBookings = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);

  const handleSelect = (date) => {
    const bookingsForDate = getBookings(date);
    if (bookingsForDate.length > 0) {
      setSelectedDate(date);
      setBookings(bookingsForDate);
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setBookings([]);
    setSelectedDate(null);
  };

  return (
    <div className="d-flex flex-column justify-content-between align-items-center bg-light shadow-sm rounded-4  pt-4">
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
        bookings={bookings}
      />
    </div>
  );
};

export default CalendarBookings;
