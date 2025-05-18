import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  createHotel,
  deleteHotel,
  editHotel,
} from "../../../../redux/features/hotels/HotelSlice";

export function useHotelHandlers() {
  const dispatch = useDispatch();
  const { data: hotels, status, error } = useSelector((state) => state.hotels);
  const { data: destinations = [] } = useSelector(
    (state) => state.destinations
  );

  const initialFormData = {
    name: "",
    address: "",
    description: "",
    longDescription: "",
    languagesSpoken: [], 
  images:[],
     pricePerNight: 0,
    emailHotel: "",
    contactHotel: "",
    HotelLink: "",
    award: "",
    hotelClass: "",
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
    latitude: 0,
    longitude: 0,
    hotelStyle: [],
    isAvaliable: true,
    cancellationDeadline: null, 

    rooms: [
      {
        roomNumber: "",
        floorNumber: 1, 
        type: "Single", 
        description: "",
        maxAdults: 1, 
        maxChildren: 0, 
        bookedDates: [],
        roomSize: "", 
        bedType: "", 
      },
    ],

    amenities: [], 
    destinationId: "",

    sumRating: 0,
    totalReviews: 0,
    averageRating: 0,
    ranking: {
      position: 0,
      totalHotels: 0,
    },
    scoreDetails: {
      Location: 0,
      Rooms: 0,
      Value: 0,
      Cleanliness: 0,
      Service: 0,
      "Sleep Quality": 0,
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setFormData(initialFormData);
    setShowModal(false);
  };

  const handleChange = (e, field) => {
    const { name, value, type, checked } = e.target;

    if (
      field === "languagesSpoken" ||
      field === "amenities" ||
      field === "hotelStyle"
    ) {
      setFormData((prev) => ({
        ...prev,
        [field]: value.split(",").map((item) => item.trim()),
      }));
      return;
    }

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: isNaN(value) ? value : parseFloat(value),
        },
      }));
      return;
    }

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    if (
      !isNaN(value) &&
      (name === "pricePerNight" || name === "latitude" || name === "longitude")
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
      return;
    }
if (name === "averageRating") {
  setFormData((prev) => ({
    ...prev,
    [name]: parseFloat(value) || 0,
  }));
  return;
}
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
const allImages = Array.isArray(formData.images) ? formData.images : [];
console.log("All images before filtering:", allImages);

const filteredImages = allImages.filter(
  (url) => url && typeof url === "string" && !url.startsWith("blob:")
);

console.log("Filtered images:", filteredImages);

if (!filteredImages.length) {
  alert("At least one valid image is required.");
  return;
}

    const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);
    if (!isValidObjectId(formData.destinationId)) {
      alert("Invalid destination ID.");
      return;
    }

    const invalidAmenities = (formData.amenities || []).filter(
      (id) => !isValidObjectId(id)
    );
    if (invalidAmenities.length) {
      alert("One or more amenities are invalid.");
      return;
    }

    if (!formData.hotelStyle || !formData.hotelStyle.length) {
      alert("At least one hotel style is required.");
      return;
    }

    const coordinates = formData.location?.coordinates || [0, 0];
    const normalizedCoordinates = [
      parseFloat(coordinates[0]),
      parseFloat(coordinates[1]),
    ];

    const payload = {
     ...formData,
 base64Images: filteredImages,


      amenities: formData.amenities || [],
      languagesSpoken: (formData.languagesSpoken || []).map((lang) =>
        lang.trim()
      ),
      hotelStyle: (formData.hotelStyle || []).map((style) => style.trim()),
      location: {
        ...formData.location,
        type: "Point",
        coordinates: normalizedCoordinates,
      },
    };

    try {
      console.log("Submitting images array length:", filteredImages.length);
console.log("Sample image data:", filteredImages[0]?.substring(0, 30));
      await dispatch(createHotel(payload)).unwrap();
      handleClose();
            console.log("Payload images:", payload.images)

    } catch (err) {
      console.error("Failed to add hotel: ", err);
      alert("An error occurred while submitting the hotel.");
    }
  };

  const handleEditSubmit = async (id, updatedData) => {
    try {
      await dispatch(editHotel({ id, updatedData })).unwrap();
      handleClose();
    } catch (err) {
      console.error("Failed to update hotel:", err);
      alert("An error occurred while updating the hotel.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteHotel(id)).unwrap();
    } catch (err) {
      console.error("Failed to delete hotel:", err);
    }
  };

  return {
    hotels,
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
