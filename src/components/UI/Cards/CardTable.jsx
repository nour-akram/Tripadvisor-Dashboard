import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "react-bootstrap";
// import api from "../../../services/api";
import { MdTune } from "react-icons/md";
import CardRow from "./CardRow";
import CardFormModal from "./CardFormModal";
import Loader from "../Loader";
export default function CardTable({ type }) {
 const isHotel = type === "hotel";

  const {
    data: hotels,
    status: hotelStatus,
    error: hotelError,
  } = useSelector((state) => state.hotels);
  const {
    data: restaurants,
    status: restaurantStatus,
    error: restaurantError,
  } = useSelector((state) => state.restaurants);

  const { data: destinations } = useSelector((state) => state.destinations)
  console.log("Destinations:", destinations);
  



  const cards = isHotel ? hotels : restaurants;
  const status = isHotel ? hotelStatus : restaurantStatus;
  const error = isHotel ? hotelError : restaurantError;

  console.log("Cards:", cards);

  // const [destinations, _] = useState([]);
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

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (card) => {
    setFormData({
      name: card.name || "",
      address: card.address || "",
      description: card.description || "",
      location: card.location?.coordinates?.join(", ") || "",
      languagesSpoken: card.languagesSpoken?.join(", ") || "",
      images: card.images?.join(", ") || "",
      pricePerNight: card.pricePerNight || "",
      hotelStyle: card.hotelStyle?.join(", ") || "",
      destinationId: card.destinationId || "",
      amenities: card.amenities?.join(", ") || "",
      hotelClass: card.hotelClass || "",
      destination: card.destination || "",
      cuisines: card.cuisines?.join(", ") || "",
      mealTypes: card.mealTypes?.join(", ") || "",
      specialDiets: card.specialDiets?.join(", ") || "",
      menu:
        card.menu
          ?.map((item) => `${item.name} | ${item.price} | ${item.description}`)
          .join("; ") || "",
    });

    handleShow();
  };

  if (status === "loading") return <Loader />;
  if (status === "failed") return <div>Error: {error}</div>;
  if (!Array.isArray(cards)) return <div>No cards available.</div>;

  return (
    <div className="table-container px-3">
      <div className="table-header d-flex justify-content-between align-items-center mb-2">
        <h2 className="table-title fs-5 fw-semibold text-gray-800 m-0">
          {type === "hotel" ? "Hotels" : "Restaurants"}
        </h2>
        <div className="d-flex justify-content-end align-items-center mb-2 ">
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
      </div>
      <div className="table-header bg-gray-100 text-gray-700 text-sm">
        <div className="table-row border-b  ">
          <div className="table-cell fs-6   d-flex justify-content-start">
            Name
          </div>
          <div className="table-cell fs-6 ">Destination</div>
          <div className="table-cell fs-6 ">Rate</div>
          <div className="table-cell fs-6">
            {type === "resturant" ? "Date" : "Price per Night"}
          </div>
          <div className="table-cell fs-6">Action</div>
        </div>
      </div>

      <div className="table-body text-gray-600">
        {cards.map((card) => (
          <CardRow
            key={card._id}
            card={card}
            type={type}
            handleEdit={handleEdit}
          />
        ))}
      </div>

      <CardFormModal
        showModal={showModal}
        handleClose={handleClose}
        handleChange={handleChange}
        formData={formData}
        destinations={destinations}
        type={type}
      />
    </div>
  );
}
