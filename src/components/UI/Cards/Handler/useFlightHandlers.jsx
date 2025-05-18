// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import {
//   createFlight,
//   deleteFlight,
//   editFlight,
// } from "../../../../redux/features/Flights/flightSlice";
// export function useFlightHandlers() {
//   const dispatch = useDispatch();
//   const { data: flights, status, error } = useSelector((state) => state.flights);
//   const { data: destinations = [] } = useSelector(
//     (state) => state.destinations
//   );
//   const initialFormData = {
//   flightNumber: "",
//   origin: {
//     name: "",
//     region: "",
//     country: "",
//     description: "",
//     images: [],
//     attractions: [],
//     bestTimeToVisit: "",
//     activities: [],
//   },
//   destination: {
//     name: "",
//     region: "",
//     country: "",
//     description: "",
//     images: [],
//     attractions: [],
//     bestTimeToVisit: "",
//     activities: [],
//   },
//   departureDate: "",
//   arrivalDate: "",
//   airline: "",
//   flightDuration: 0,
//   seats: [
//     {
//       seatNumber: "",
//       seatType: "",
//       price: 0,
//       currency: "",
//       bookedSeats: 0,
//     },
//   ],
//     numberOfStops: 0,
//     stopsLocation: [], 
// };
//   const [formData, setFormData] = useState(initialFormData);
//   const [showModal, setShowModal] = useState(false);

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => {
//     setFormData(initialFormData);
//     setShowModal(false);
//   };

//   const handleChange = (e, field) => {
//     const { name, value } = e.target;

//     const splitFields = [
//       "origin.images",
//       "origin.attractions",
//       "origin.activities",
//       "destination.images",
//       "destination.attractions",
//       "destination.activities",
//     ];

//     if (splitFields.includes(name)) {
//       const [parent, child] = name.split(".");
//       setFormData((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value.split(",").map((item) => item.trim()),
//         },
//       }));
//     } else if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setFormData((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: isNaN(value) ? value : parseFloat(value),
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: isNaN(value) ? value : parseFloat(value),
//       }));
//     }
//   };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   console.log("Submitting flight formData:", formData);

//   const originImages = (formData.origin.images || []).filter(
//     (url) => url && !url.startsWith("blob:")
//   );
//   const destinationImages = (formData.destination.images || []).filter(
//     (url) => url && !url.startsWith("blob:")
//   );
//   if (!originImages.length && !destinationImages.length) {
//     alert("At least one valid image URL is required for origin or destination.");
//     return;
//   }

//   if (!formData.flightNumber) {
//     alert("Flight number is required.");
//     return;
//   }
//   if (!formData.origin.name) {
//     alert("Origin name is required.");
//     return;
//   }
//   if (!formData.destination.name) {
//     alert("Destination name is required.");
//     return;
//   }


//   const payload = {
//     ...formData,
//     origin: {
//       ...formData.origin,
//       images: originImages,
//     },
//     destination: {
//       ...formData.destination,
//       images: destinationImages,
//     },
//     seats: formData.seats || [],
//   };

//   console.log("Submitting flight payload:", payload);

//   try {
//     await dispatch(createFlight(payload)).unwrap();
//     handleClose();
//   } catch (err) {
//     console.error("Failed to add flight: ", err);
//     alert("An error occurred while submitting the flight.");
//   }
// };
//   const handleEditSubmit = async (id, updatedData) => {
//     try {
//       await dispatch(editFlight({ id, updatedData })).unwrap();
//       handleClose();
//     } catch (err) {
//       console.error("Failed to update flight:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteFlight(id)).unwrap();
//     } catch (err) {
//       console.error("Failed to delete flight:", err);
//     }
//   };

//   return {
//     flights,
//     destinations,
//     formData,
//     showModal,
//     handleShow,
//     handleClose,
//     handleChange,
//       handleSubmit,
//     handleEditSubmit,
//     handleDelete,
//     setFormData,
//     status,
//     error,
//     initialFormData,
//   };
// }








// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import {
//   createFlight,
//   deleteFlight,
//   editFlight,
// } from "../../../../redux/features/Flights/flightSlice";

// export function useFlightHandlers() {
//   const dispatch = useDispatch();
//   const { data: flights, status, error } = useSelector((state) => state.flights);
//   const { data: destinations = [] } = useSelector(
//     (state) => state.destinations
//   );
//   const initialFormData = {
//     flightNumber: "",
//     origin: {
//       name: "",
//       region: "",
//       country: "",
//       description: "",
//       images: [],
//       attractions: [],
//       bestTimeToVisit: "",
//       activities: [],
//     },
//     destination: {
//       name: "",
//       region: "",
//       country: "",
//       description: "",
//       images: [],
//       attractions: [],
//       bestTimeToVisit: "",
//       activities: [],
//     },
//     departureDate: "",
//     arrivalDate: "",
//     airline: "",
//     flightDuration: 0,
//     seats: [
//       {
//         seatNumber: "",
//         seatType: "",
//         price: 0,
//         currency: "",
//         bookedSeats: 0,
//       },
//     ],
//     numberOfStops: 0,
//     stopsLocation: [],
//   };
//   const [formData, setFormData] = useState(initialFormData);
//   const [showModal, setShowModal] = useState(false);

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => {
//     setFormData(initialFormData);
//     setShowModal(false);
//   };

//   const handleChange = (e, field) => {
//     const { name, value } = e.target;

//     const splitFields = [
//       "origin.images",
//       "origin.attractions",
//       "origin.activities",
//       "destination.images",
//       "destination.attractions",
//       "destination.activities",
//     ];

//     if (splitFields.includes(name)) {
//       const [parent, child] = name.split(".");
//       setFormData((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value.split(",").map((item) => item.trim()),
//         },
//       }));
//     } else if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setFormData((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: isNaN(value) ? value : parseFloat(value),
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: isNaN(value) ? value : parseFloat(value),
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitting flight formData:", formData);

//     const originImages = (formData.origin.images || []).filter(
//       (url) => url && !url.startsWith("blob:")
//     );
//     const destinationImages = (formData.destination.images || []).filter(
//       (url) => url && !url.startsWith("blob:")
//     );
//     if (!originImages.length && !destinationImages.length) {
//       alert("At least one valid image URL is required for origin or destination.");
//       return;
//     }

//     if (!formData.flightNumber) {
//       alert("Flight number is required.");
//       return;
//     }
//     if (!formData.origin.name) {
//       alert("Origin name is required.");
//       return;
//     }
//     if (!formData.destination.name) {
//       alert("Destination name is required.");
//       return;
//     }

//     const payload = {
//       ...formData,
//       origin: {
//         ...formData.origin,
//         images: originImages,
//       },
//       destination: {
//         ...formData.destination,
//         images: destinationImages,
//       },
//       seats: formData.seats || [],
//     };

//     console.log("Submitting flight payload:", payload);

//     try {
//       await dispatch(createFlight(payload)).unwrap();
//       handleClose();
//     } catch (err) {
//       console.error("Failed to add flight: ", err);
//       alert("An error occurred while submitting the flight: " + err.message);
//     }
//   };

//   const handleEditSubmit = async (id, updatedData) => {
//     try {
//       await dispatch(editFlight({ id, updatedData })).unwrap();
//       handleClose();
//     } catch (err) {
//       console.error("Failed to update flight:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteFlight(id)).unwrap();
//     } catch (err) {
//       console.error("Failed to delete flight:", err);
//     }
//   };

//   return {
//     flights,
//     destinations,
//     formData,
//     showModal,
//     handleShow,
//     handleClose,
//     handleChange,
//     handleSubmit,
//     handleEditSubmit,
//     handleDelete,
//     setFormData,
//     status,
//     error,
//     initialFormData,
//   };
// }






import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  createFlight,
  deleteFlight,
  editFlight,
} from "../../../../redux/features/Flights/flightSlice";

export function useFlightHandlers() {
  const dispatch = useDispatch();
  const { data: flights, status, error } = useSelector((state) => state.flights);
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

  const handleChange = (e, field) => {
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

    const selectedOrigin = destinations.find(
      (dest) => dest.name === formData.origin.name || dest.name === formData.origin
    );
    const selectedDestination = destinations.find(
      (dest) => dest.name === formData.destination.name || dest.name === formData.destination
    );

    if (!selectedOrigin || !selectedDestination) {
      alert("Please select valid origin and destination.");
      return;
    }

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
    const selectedOrigin = destinations.find(
    (dest) => dest.name === updatedData.origin?.name || dest.name === updatedData.origin
  );
  const selectedDestination = destinations.find(
    (dest) => dest.name === updatedData.destination?.name || dest.name === updatedData.destination
  );

  if (!selectedOrigin || !selectedDestination) {
    alert("Please select valid origin and destination.");
    return;
  } const payload = {
    ...updatedData,
    origin: selectedOrigin._id,
    destination: selectedDestination._id,
    seats: updatedData.seats || [],
  };

   try {
    await dispatch(editFlight({ id, updatedData: payload })).unwrap();
    handleClose();
  } catch (err) {
    console.error("Failed to update flight:", err);
    alert("An error occurred while updating the flight: " + err.message);
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