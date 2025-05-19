import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  createRestaurant,
  deleteRestaurant,
  editRestaurant,
  fetchRestaurants,
} from "../../../../redux/features/restaurants/restaurantSlice";

export function useRestaurantHandlers() {
  const dispatch = useDispatch();
  const { data: restaurants, status, error } = useSelector(
    (state) => state.restaurants
  );
  const { data: destinations } = useSelector((state) => state.destinations);

  const initialFormData = {
    name: "",
    destination: "",
    latitude: "",
    longitude: "",
    images: {
      restaurantImages: [],
      menuImages: [],
      interiorImages: [],
    },
    imageFiles: {
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
    location: {
      address: "",
      city: "",
      country: "",
    },
hours: {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
},
    menu: [],
    rank: 0,
    rating: 0,   
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);

  const handleClose = () => {
    setFormData(initialFormData);
    setShowModal(false);
  };



const handleChange = (e, field) => {
  const { name, value, files } = e.target;

  if (files) {
    const [, type] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      imageFiles: {
        ...prev.imageFiles,
        [type]: Array.from(files),
      },
    }));
  } else if (field) {
    const [mainField, subField] = field.split(".");
    setFormData((prev) => ({
      ...prev,
      [mainField]: {
        ...prev[mainField],
        [subField]: value.split(",").map((item) => item.trim()),
      },
    }));
  } else if (name.startsWith("location.")) {
    const [, locField] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [locField]: value,
      },
    }));
  }else if (name === "rating") {
  const parsedRating = parseFloat(value) || 0;
  console.log("Rating updated:", parsedRating);
  setFormData((prev) => ({
    ...prev,
    rating: parsedRating,
  }));
}else if (name === "menu") {
    const menuItems = value.split("\n").map((item) => {
      const [name, description, price] = item.split(",").map((s) => s.trim());
      return { name, description, price: parseFloat(price) };
    });
    setFormData((prev) => ({ ...prev, menu: menuItems }));
  }
  
  
  
  else if (name === "hours") {
  const lines = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const hoursMap = {};
lines.forEach((line) => {
  const [day, slots] = line.split(":");
  if (day && slots) {
    hoursMap[day.trim()] = slots
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
});
  setFormData((prev) => ({
    ...prev,
    hours: hoursMap, 
  }));
  } 
  
  
  
  
  
  else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};


const handleSubmit = async () => {
  // e.preventDefault();

  const form = new FormData();
console.log(" formData.hours type:", typeof formData.hours);
console.log(" formData.hours is Array:", Array.isArray(formData.hours));
console.log(" formData.hours value:", formData.hours);
  form.append("name", formData.name);
  form.append("destination", formData.destination);
  form.append("latitude", formData.latitude);
  form.append("longitude", formData.longitude);
  form.append("website", formData.website);
  form.append("phone", formData.phone);
  form.append("rank", formData.rank);
form.append("rating", formData.rating.toString());
form.append("hours", JSON.stringify(formData.hours));



form.append(
  "location",
  JSON.stringify({
    address: formData.location.address,
    city: formData.location.city,
    country: formData.location.country,
  })
);



  // Features
  formData.features.cuisines.forEach((item) =>
    form.append("features[cuisines][]", item)
  );
  formData.features.specialDiets.forEach((item) =>
    form.append("features[specialDiets][]", item)
  );
  formData.features.mealTypes.forEach((item) =>
    form.append("features[mealTypes][]", item)
  );





  formData.menu.forEach((item, idx) => {
    form.append(`menu[${idx}][name]`, item.name);
    form.append(`menu[${idx}][description]`, item.description);
    form.append(`menu[${idx}][price]`, item.price);
  });

function base64ToBlob(base64, mime) {
  const byteChars = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mime });
}


Object.entries(formData.imageFiles).forEach(([key, files]) => {
  if (files && files.length > 0) {
    files.forEach((file) => {
      form.append(key, file); 
    });
  } else if (formData.images[key] && formData.images[key].length > 0) {
    formData.images[key].forEach((base64Str) => {
      const mime = base64Str.match(/^data:(.*);base64,/)[1];
      const blob = base64ToBlob(base64Str, mime);
      form.append(key, blob, `image.${mime.split('/')[1]}`);
    });
  }
});


  try {
    await dispatch(createRestaurant(form)).unwrap();
    dispatch(fetchRestaurants());
    handleClose();
  } catch (err) {
    console.error("Submission failed:", err);
  }
};


  const handleDelete = async (id) => {
    try {
      await dispatch(deleteRestaurant(id)).unwrap();
      console.log("Restaurant deleted successfully");
      dispatch(fetchRestaurants());

    } catch (err) {
      console.error("Failed to delete restaurant:", err);
    }
  };

  const handleEditSubmit = async (id, updatedData) => {
    try {
      console.log("Submitting edit for restaurant:", id, updatedData);
      await dispatch(editRestaurant({ id, updatedData })).unwrap();
      console.log("Restaurant updated successfully");
      dispatch(fetchRestaurants());
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
    initialFormData,
  };
}
