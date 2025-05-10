import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { fetchCards } from "../../../redux/features/cards/cardSlice";
import CardRow from "./CardRow";
import api from "../../../services/api";
import { MdTune } from "react-icons/md";
import CardFormModal from "./CardFormModal";
export default function CardTable({ endpoint = "", type }) {
  const dispatch = useDispatch();
  const { dataByEndpoint, statusByEndpoint, errorByEndpoint } = useSelector(
    (state) => state.cards
  );
  const cards = dataByEndpoint[endpoint] || [];
  const status = statusByEndpoint[endpoint] || "idle";
  const error = errorByEndpoint[endpoint];
  const [destinations, setDestinations] = useState([]);


  
  useEffect(() => {
    const fetchDestinations = async () => {
      const response = await api.get("/destination");
      setDestinations(response.data);
    };
    fetchDestinations();
  }, []);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    location: "",
    languagesSpoken: "",
    images: "",
    pricePerNight: "",
    emailHotel: "",
    contactHotel: "",
    hotelStyle: "",
    cancellationDeadline: "",
    destinationId: "",
    amenities: "",
    hotelClass: "",
      destination: "",
  cuisines: "",
  mealTypes: "",
  specialDiets: "",
  menu: "",
  });
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCards(endpoint));
    }
  }, [dispatch, status, endpoint]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidObjectId(formData.destinationId)) {
      alert("Invalid Destination ID");
      return;
    }
    const commonData = {
      name: formData.name,
      address: formData.address,
      description: formData.description,
      location: {
        type: "Point",
        coordinates: formData.location
          .split(",")
          .map((coord) => parseFloat(coord.trim())),
      },
    };

    let payload;

    if (type === "hotel") {
      payload = {
        ...commonData,
        hotelClass: formData.hotelClass,
        languagesSpoken: formData.languagesSpoken
          .split(",")
          .map((item) => item.trim()),
        images: formData.images.split(",").map((item) => item.trim()),
        pricePerNight: parseFloat(formData.pricePerNight),
        hotelStyle: formData.hotelStyle.split(",").map((item) => item.trim()),
        destinationId: formData.destinationId,
        amenities: formData.amenities.split(",").map((item) => item.trim()),
      };
    } else if (type === "restaurant") {
      payload = {
        ...commonData,
        destination: formData.destination,
        cuisines: formData.cuisines.split(",").map((item) => item.trim()),
        mealTypes: formData.mealTypes.split(",").map((item) => item.trim()),
        specialDiets: formData.specialDiets
          .split(",")
          .map((item) => item.trim()),
        menu: formData.menu.split(";").map((item) => {
          const [name, price, description] = item
            .split("|")
            .map((str) => str.trim());
          return { name, price: parseFloat(price), description };
        }),
      };
    }

    try {
      const endpoint = type === "hotel" ? "/hotel" : "/restaurant";
      const response = await api.post(endpoint, payload); // Use axios instance
      console.log("Submitting payload:", payload);

      if (response.status === 201 || response.status === 200) {
        alert(
          `${type === "hotel" ? "Hotel" : "Restaurant"} created successfully`
        );
        handleClose();
      } else {
        alert(`Error: ${response.data.message || "Failed to create"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

   
const handleEdit = (card) => {
  console.log(card);

  setFormData({
    name: card.name || '',  
    address: card.address || '',
    description: card.description || '',
    location: card.location && card.location.coordinates ? card.location.coordinates.join(", ") : '',
    languagesSpoken: card.languagesSpoken ? card.languagesSpoken.join(", ") : '',
    images: card.images ? card.images.join(", ") : '',
    pricePerNight: card.pricePerNight || '',
    hotelStyle: card.hotelStyle ? card.hotelStyle.join(", ") : '',
    destinationId: card.destinationId || '',
    amenities: card.amenities ? card.amenities.join(", ") : '',
    hotelClass: card.hotelClass || ''
  });

  handleShow();
};

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  if (!Array.isArray(cards)) return <div>No cards available.</div>;

  return (
    <div className="table-container">
      <div className="d-flex justify-content-end align-items-center mb-2 me-5">
        <button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#E0E4E7",
            borderRadius: "999px",
            padding: "5px 15px",
            marginRight: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            color: "#000",
            fontWeight: 500,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "6px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "10px",
            }}
          >
            <MdTune style={{ fontSize: "16px", color: "#000" }} />
          </div>
          Filter
        </button>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "1.5rem",
            border: "1px solid #fff",
          }}
        >
          +
        </Button>
      </div>

      <div className="table-header bg-gray-100 text-gray-700 text-sm">
        <div className="table-row border-b">
          <div className="table-cell p-4">Name</div>
          <div className="table-cell p-4">Destination</div>
          <div className="table-cell p-4">Rate</div>
          <div className="table-cell p-4">Status</div>
          <div className="table-cell p-4">Date</div>
          <div className="table-cell p-4">Action</div>
        </div>
      </div>

      <div className="table-body text-gray-600">
        {cards.map((card) => (
          <CardRow key={card.id} card={card} endpoint={endpoint} handleEdit={handleEdit} />
        ))}
      </div>

  <CardFormModal
  showModal={showModal}
  handleClose={handleClose}
  handleSubmit={handleSubmit}
  handleChange={handleChange}
  formData={formData}
  destinations={destinations}
  type={type}
/>

    </div>
  );
}





