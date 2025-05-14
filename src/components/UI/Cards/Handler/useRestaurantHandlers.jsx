import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createRestaurant ,deleteRestaurant,editRestaurant} from "../../../../redux/features/restaurants/restaurantSlice";

export function useRestaurantHandlers() {
  const dispatch = useDispatch();
  const { data: restaurants, status, error } = useSelector((state) => state.restaurants);
  const { data: destinations } = useSelector((state) => state.destinations);

  const initialFormData = {
    name: "",
    address: "",
    destination: "",
    latitude: "",
    longitude: "",
    images: {
      restaurantImages: [],
      menuImages: [],
      interiorImages: [],
    },
    features: {
      cuisines: [],
      mealTypes: [],
      specialDiets: [],
    },
    website: "",
    phone: "",
    location: "",
    hours: "",
    menu: [],
    rank: 0,
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

    if (field) {
      const [mainField, subField] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [mainField]: {
          ...prev[mainField],
          [subField]: value.split(",").map((item) => item.trim()),
        },
      }));
    } else if (name.startsWith("images.")) {
      const [, imageType] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          [imageType]: value.split(",").map((url) => url.trim()),
        },
      }));
    } else if (name === "menu") {
      const menuItems = value.split("\n").map((item) => {
        const [name, description, price] = item.split(",").map((s) => s.trim());
        return { name, description, price };
      });
      setFormData((prev) => ({ ...prev, menu: menuItems }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createRestaurant(formData)).unwrap();
      handleClose();
    } catch (err) {
      console.error("Failed to add restaurant:", err);
    }
  };
const handleDelete = async (id) => {
  try {
    await dispatch(deleteRestaurant(id)).unwrap();
    console.log("Restaurant deleted successfully");
  } catch (err) {
    console.error("Failed to delete restaurant:", err);
  }
};


const handleEditSubmit = async (id, updatedData) => {
  try {
    console.log("Submitting edit for restaurant:", id, updatedData); 

    await dispatch(editRestaurant({ id, updatedData })).unwrap();
    console.log("Restaurant updated successfully");
    handleClose(); 
  } catch (err) {
    console.error("Failed to update restaurant:", err);
  }
};
  return {
    restaurants,
    destinations,
    formData,
    showModal,
    handleShow,
    handleClose,
    handleChange,
    handleSubmit,
    setFormData,
      handleDelete, 
      handleEditSubmit,
    status,
    error,
    initialFormData
  };
}
