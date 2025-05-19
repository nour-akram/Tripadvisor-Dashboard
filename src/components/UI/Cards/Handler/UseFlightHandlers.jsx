import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  createFlight,
  deleteFlight,
  editFlight,
} from "../../../../redux/features/Flights/flightSevice";

export function useFlightHandlers() {
  const dispatch = useDispatch();
  const {
    data: flights,
    status,
    error,
  } = useSelector((state) => state.flights);
  const { data: destinations = [] } = useSelector(
    (state) => state.destinations
  );
  const initialFormData = {
    flightNumber: "",
    origin: {
      name: "",
      region: "",
      country: "",
      description: "",
      images: [],
      attractions: [],
      bestTimeToVisit: "",
      activities: [],
    },
    destination: {
      name: "",
      region: "",
      country: "",
      description: "",
      images: [],
      attractions: [],
      bestTimeToVisit: "",
      activities: [],
    },
    departureDate: "",
    arrivalDate: "",
    airline: "",
    flightDuration: 0,
    seats: [
      {
        seatNumber: "",
        seatType: "",
        price: 0,
        currency: "",
        bookedSeats: 0,
      },
    ],
    numberOfStops: 0,
    stopsLocation: [],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setFormData(initialFormData);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const splitFields = [
      "origin.images",
      "origin.attractions",
      "origin.activities",
      "destination.images",
      "destination.attractions",
      "destination.activities",
    ];

    if (splitFields.includes(name)) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value.split(",").map((item) => item.trim()),
        },
      }));
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: isNaN(value) ? value : parseFloat(value),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(value) ? value : parseFloat(value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the selected origin and destination objects by name
    const selectedOrigin = destinations.find(
      (dest) =>
        dest.name === formData.origin.name || dest.name === formData.origin
    );
    const selectedDestination = destinations.find(
      (dest) =>
        dest.name === formData.destination.name ||
        dest.name === formData.destination
    );

    if (!selectedOrigin || !selectedDestination) {
      alert("Please select valid origin and destination.");
      return;
    }

    // Prepare the payload with ObjectId for origin and destination
    const payload = {
      ...formData,
      origin: selectedOrigin._id,
      destination: selectedDestination._id,
      seats: formData.seats || [],
    };

    try {
      await dispatch(createFlight(payload)).unwrap();
      handleClose();
    } catch (err) {
      console.error("Failed to add flight: ", err);
      alert("An error occurred while submitting the flight: " + err.message);
    }
  };

  const handleEditSubmit = async (id, updatedData) => {
    try {
      await dispatch(editFlight({ id, updatedData })).unwrap();
      handleClose();
    } catch (err) {
      console.error("Failed to update flight:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteFlight(id)).unwrap();
    } catch (err) {
      console.error("Failed to delete flight:", err);
    }
  };

  return {
    flights,
    destinations,
    formData,
    showModal,
    handleShow,
    handleClose,
    handleChange,
    handleSubmit,
    handleEditSubmit,
    handleDelete,
    setFormData,
    status,
    error,
    initialFormData,
  };
}
