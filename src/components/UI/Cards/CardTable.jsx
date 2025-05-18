import { Button } from "react-bootstrap";
import Loader from "../Loader";
import RestaurantFormModal from "./ModelForm/RestaurantFormModal";
import HotelFormModal from "./ModelForm/HotelFormModel";
import AttractionForm from "./ModelForm/AttractionForm/AttractionForm";
import CardRow from "./CardRow";
import { useRestaurantHandlers } from "./Handler/useRestaurantHandlers";
import { useHotelHandlers } from "./Handler/useHotelHandlers";
import { useAttractionHandlers } from "./Handler/useAttractionHandlers";

export default function CardTable({ type }) {
  const {
    restaurants,
    destinations: restaurantDestinations,
    formData: restaurantFormData,
    showModal: showRestaurantModal,
    handleShow: handleShowRestaurant,
    handleClose: handleCloseRestaurant,
    handleChange: handleChangeRestaurant,
    handleSubmit: handleSubmitRestaurant,
    setFormData: setRestaurantFormData,
    handleDelete: handleDeleteRestaurant,
    handleEditSubmit: handleEditSubmitRestaurant,
    status: restaurantStatus,
    error: restaurantError,
  } = useRestaurantHandlers();

  const {
    hotels,
    formData: hotelFormData,
    showModal: showHotelModal,
    handleShow: handleShowHotel,
    handleClose: handleCloseHotel,
    handleChange: handleChangeHotel,
    handleSubmit: handleSubmitHotel,
    handleEditSubmit: handleEditSubmitHotel,
    handleDelete: handleDeleteHotel,
    setFormData: setHotelFormData,
    status: hotelStatus,
    error: hotelError,
  } = useHotelHandlers();

  const {
    attractions,
    formData: attractionFormData,
    setFormData: setAttractionFormData,
    showModal: showAttractionModal,
    handleShow: handleShowAttraction,
    handleClose: handleCloseAttraction,
    handleCreate: handleCreateAttraction,
    handleEditSubmit: handleEditSubmitAttraction,
    handleDelete: handleDeleteAttraction,
    status: attractionStatus,
    error: attractionError,
  } = useAttractionHandlers();

  const isRestaurant = type === "restaurant";
  const isHotel = type === "hotel";
  const isAttraction = type === "attractions";

  if (
    (isRestaurant && restaurantStatus === "loading") ||
    (isHotel && hotelStatus === "loading") ||
    (isAttraction && attractionStatus === "loading")
  ) {
    return <Loader />;
  }

  if (
    (isRestaurant && restaurantStatus === "failed") ||
    (isHotel && hotelStatus === "failed") ||
    (isAttraction && attractionStatus === "failed")
  ) {
    const rawError = restaurantError || hotelError || attractionError;
    const errorMessage =
      typeof rawError === "string"
        ? rawError
        : rawError?.message || "Something went wrong";

    return <div>Error: {errorMessage}</div>;
      }

  const data = isRestaurant ? restaurants : isHotel ? hotels : attractions;

  const headers = isHotel
    ? ["Name", "Destination", "Average Rating", "Total Reviews", "Action"]
    : isAttraction
    ? ["Name", "Location", "Rating", "Reviews", "Action"]
    : ["Name", "Destination", "Rate", "Date", "Action"];

  return (
    <div className="table-container p-0 px-2">
      <div className="table-header d-flex justify-content-between align-items-start mb-2">
        <h2 className="table-title fs-5 fw-semibold text-gray-800 m-0">
          {isRestaurant ? "Restaurants" : isHotel ? "Hotels" : "Attractions"}
        </h2>

        {(isRestaurant || isHotel || isAttraction) && (
          <Button
            variant="primary"
            onClick={
              isRestaurant
                ? handleShowRestaurant
                : isHotel
                ? handleShowHotel
                : handleShowAttraction
            }
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
        )}
      </div>

      <div className="table-container p-0">
        <div className="table-header bg-gray-100 text-gray-700 text-sm d-flex justify-content-between align-items-center p-3 px-0 rounded">
          {headers.map((header, idx) => (
            <div
              className={`table-cell text-small fw-medium ${
                idx === 0 && " d-flex justify-content-start ms-2 "
              }`}
              key={header}
            >
              {header}
            </div>
          ))}
        </div>

        <div className="table-body text-gray-600 mt-1">
          {data.map((card,index) => (
            
            <div key={card._id ?? index}>
              <CardRow
                card={card}
                type={type}
                handleEdit={() => {
                  if (isRestaurant) {
                    setRestaurantFormData(card);
                    handleShowRestaurant();
                  } else if (isHotel) {
                    setHotelFormData(card);
                    handleShowHotel();
                  } else if (isAttraction) {
                    setAttractionFormData(card);
                    handleShowAttraction();
                  }
                }}
                handleDelete={
                  isRestaurant
                    ? handleDeleteRestaurant
                    : isHotel
                    ? handleDeleteHotel
                    : handleDeleteAttraction
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {isRestaurant && (
        <RestaurantFormModal
          showModal={showRestaurantModal}
          handleClose={handleCloseRestaurant}
          handleChange={handleChangeRestaurant}
          formData={restaurantFormData}
          handleSubmit={handleSubmitRestaurant}
          handleEditSubmit={handleEditSubmitRestaurant}
          destinations={restaurantDestinations}
          setFormData={setRestaurantFormData}
        />
      )}

      {isHotel && (
        <HotelFormModal
          showModal={showHotelModal}
          handleClose={handleCloseHotel}
          handleChange={handleChangeHotel}
          formData={hotelFormData}
          handleSubmit={handleSubmitHotel}
          handleEditSubmit={handleEditSubmitHotel}
          destinations={restaurantDestinations}
          setFormData={setHotelFormData}
        />
      )}

      {isAttraction && showAttractionModal && (
        <AttractionForm
          onClose={handleCloseAttraction}
          onSubmit={(formData, id) => {
            if (id) {
              handleEditSubmitAttraction(formData, id);
            } else {
              handleCreateAttraction(formData);
            }
          }}
          initialData={attractionFormData}
        />
      )}
    </div>
  );
}
