import { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import "./style.css";
const Index = () => {
  const [value, setValue] = useState(dayjs());

  return (
    <div className="d-flex flex-column justify-content-between align-items-center bg-light shadow-sm rounded-4 pt-4">
      <h5 className="fw-semibold  fs-6">Schedule of Bookings</h5>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
     
        />
      </LocalizationProvider>
    </div>
  );
};

export default Index;
