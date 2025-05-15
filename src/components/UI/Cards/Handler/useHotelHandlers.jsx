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
    images: [],
    pricePerNight: 0,
    emailHotel: "",
    contactHotel: "",
    HotelLink: "",
    award: "",
    location: { type: "Point", coordinates: [0, 0] },
    isAvaliable: true,
    hotelStyle: [],
    cancellationDeadline: null,
    rooms: [
      {
        type: "Single",
        maxAdults: 1,
        maxChildren: 0,
        bookedDates: [],
      },
    ],
    amenities: [],
    groupedAmenities: {
      propertyAmenities: [],
      roomFeatures: [],
      roomTypes: [],
    },
    destinationId: "",
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
    const { name, value } = e.target;

    if (
      field === "languagesSpoken" ||
      field === "amenities" ||
      field === "images" ||
      field === "hotelStyle"
    ) {
      setFormData((prev) => ({
        ...prev,
        [field]: value.split(",").map((item) => item.trim()),
      }));
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: isNaN(value) ? value : parseFloat(value), // Parse numbers
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting formData:", formData);

    const filteredImages = (formData.images || []).filter(
      (url) => !url.startsWith("blob:")
    );
    if (!filteredImages.length) {
      alert("At least one valid image URL is required.");
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

    if (!formData.hotelStyle.length) {
      alert("At least one hotel style is required.");
      return;
    }

    const payload = {
      ...formData,
      images: filteredImages,
      amenities: formData.amenities || [],
      languagesSpoken: formData.languagesSpoken || [],
      hotelStyle: formData.hotelStyle || [],
      location: {
        type: "Point",
        coordinates: formData.location?.coordinates || [0, 0],
      },
      groupedAmenities: {
        propertyAmenities: formData.groupedAmenities?.propertyAmenities || [],
        roomFeatures: formData.groupedAmenities?.roomFeatures || [],
        roomTypes: formData.groupedAmenities?.roomTypes || [],
      },
    };

    console.log("Submitting payload:", payload);

    try {
      await dispatch(createHotel(payload)).unwrap();
      handleClose();
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
