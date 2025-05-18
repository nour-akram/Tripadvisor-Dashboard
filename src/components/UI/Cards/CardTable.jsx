// import { Button } from "react-bootstrap";
// // import { MdTune } from "react-icons/md";
// import Loader from "../Loader";
// import RestaurantFormModal from "./ModelForm/RestaurantFormModal";
// import HotelFormModal from "./ModelForm/HotelFormModel";
// import CardRow from "./CardRow";
// import { useRestaurantHandlers } from "./Handler/useRestaurantHandlers";
// import { useHotelHandlers } from "./Handler/useHotelHandlers";
// import { useFlightHandlers } from "./Handler/useFlightHandlers";

// export default function CardTable({ type }) {
//   const {
//     restaurants,
//     destinations: restaurantDestinations,
//     formData: restaurantFormData,
//     showModal: showRestaurantModal,
//     handleShow: handleShowRestaurant,
//     handleClose: handleCloseRestaurant,
//     handleChange: handleChangeRestaurant,
//     handleSubmit: handleSubmitRestaurant,
//     setFormData: setRestaurantFormData,
//     handleDelete: handleDeleteRestaurant,
//     handleEditSubmit: handleEditSubmitRestaurant,
//     status: restaurantStatus,
//     error: restaurantError,
//   } = useRestaurantHandlers();

//   const {
//     hotels,
//     formData: hotelFormData,
//     showModal: showHotelModal,
//     handleShow: handleShowHotel,
//     handleClose: handleCloseHotel,
//     handleChange: handleChangeHotel,
//     handleSubmit: handleSubmitHotel,
//     handleEditSubmit: handleEditSubmitHotel,
//     handleDelete: handleDeleteHotel,
//     setFormData: setHotelFormData,
//     status: hotelStatus,
//     error: hotelError,
//   } = useHotelHandlers();
// const {
//   flights,
//   formData: flightFormData,
//   showModal: showFlightModal,
//   handleShow: handleShowFlight,
//   handleClose: handleCloseFlight,
//   handleChange: handleChangeFlight,
//   handleSubmit: handleSubmitFlight,
//   handleEditSubmit: handleEditSubmitFlight,
//   handleDelete: handleDeleteFlight,
//   setFormData: setFlightFormData,
//    status: flightstatus,
// } = useFlightHandlers();

//   const isRestaurant = type === "restaurant";
//   const isHotel = type === "hotel";
//   const isFlight = type === "flight";

//   console.log(hotels, "hotels");
//   console.log(flights, "flights");

//   if (
//     (isRestaurant && restaurantStatus === "loading") ||
//     (isHotel && hotelStatus === "loading")||
//     (isFlight && flightstatus=== "loading" )
//   ) {
//     return <Loader />;
//   }

//   if (
//     (isRestaurant && restaurantStatus === "failed") ||
//     (isHotel && hotelStatus === "failed")||
//   (isFlight && flightstatus=== "failed")
//   ) {
//     return <div>Error: {isRestaurant ? restaurantError : hotelError}</div>;
//   }

//   // const data = isRestaurant ? restaurants : hotels;

//   // const headers = isHotel
//   //   ? ["Name", "Destination", "Average Rating", "Total Reviews", "Action"]
//   //   : ["Name", "Destination", "Rate", "Date", "Action"];
//    let data = [];
//   let headers = [];
//   if (isRestaurant) {
//     data = restaurants;
//     headers = ["Name", "Destination", "Rate", "Date", "Action"];
//   } else if (isHotel) {
//     data = hotels;
//     headers = ["Name", "Destination", "Average Rating", "Total Reviews", "Action"];
//   } else if (isFlight) {
//     data = flights;
//     headers = ["Flight Number", "From", "To", "Airline", "Duration", "Action"];
//   }

//   return (
//     <div className="table-container p-0 px-2">
//       <div className="table-header d-flex justify-content-between align-items-start mb-2">
//         <h2 className="table-title fs-5 fw-semibold text-gray-800 m-0">
//           {/* {isRestaurant ? "Restaurants" : "Hotels"} */}
//           {isRestaurant ? "Restaurants" : isHotel ? "Hotels" : "Flights"}

//         </h2>
//         <Button
//           variant="primary"
//           // onClick={isRestaurant ? handleShowRestaurant : handleShowHotel}
//            onClick={isRestaurant? handleShowRestaurant: isHotel? handleShowHotel:handleShowFlight}
//           style={{
//             borderRadius: "50%",
//             width: "40px",
//             height: "40px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "#fff",
//             color: "#000",
//             fontSize: "1.5rem",
//             border: "1px solid #fff",
//           }}
//         >
//           +
//         </Button>
//       </div>

//       <div className="table-container p-0">
//         <div className="table-header bg-gray-100 text-gray-700 text-sm d-flex justify-content-between align-items-center p-3 px-0 rounded">
//           {headers.map((header, idx) => (
//             <div
//               className={`table-cell text-small fw-medium
//                 ${idx === 0 && " d-flex justify-content-start ms-2 "}
//               `}
//               key={header}
//             >
//               {header}
//             </div>
//           ))}
//         </div>

//         <div className="table-body text-gray-600 mt-1">
//           {data.map((card) => (
//             <div key={card._id}>
//               <CardRow
//                 card={card}
//                 type={type}
//                 handleEdit={() => {
//                   if (isRestaurant) {
//                     setRestaurantFormData(card);
//                     handleShowRestaurant();
//                 //   } else {
//                 //     setHotelFormData(card);
//                 //     handleShowHotel();
//                 //   }
//                 // }}
//                  } else if (isHotel) {
//       setHotelFormData(card);
//       handleShowHotel();
//     } else if (isFlight) {
//       setFlightFormData(card);
//       handleShowFlight();
//     }
//   }}
//                 // handleDelete={
//                 //   isRestaurant ? handleDeleteRestaurant : handleDeleteHotel
//                 // }
//                  handleDelete={
//     isRestaurant
//       ? handleDeleteRestaurant: isHotel? handleDeleteHotel: handleDeleteFlight}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modals */}
//       {isRestaurant && (
//         <RestaurantFormModal
//           showModal={showRestaurantModal}
//           handleClose={handleCloseRestaurant}
//           handleChange={handleChangeRestaurant}
//           formData={restaurantFormData}
//           handleSubmit={handleSubmitRestaurant}
//           handleEditSubmit={handleEditSubmitRestaurant}
//           destinations={restaurantDestinations}
//           setFormData={setRestaurantFormData}
//         />
//       )}

//       {isHotel && (
//         <HotelFormModal
//           showModal={showHotelModal}
//           handleClose={handleCloseHotel}
//           handleChange={handleChangeHotel}
//           formData={hotelFormData}
//           handleSubmit={handleSubmitHotel}
//           handleEditSubmit={handleEditSubmitHotel}
//           destinations={restaurantDestinations}
//           setFormData={setHotelFormData}
//         />
//       )}
//       {isFlight && (
//   <flightFormData
//     showModal={showFlightModal}
//     handleClose={handleCloseFlight}
//     handleChange={handleChangeFlight}
//     formData={flightFormData}
//     handleSubmit={handleSubmitFlight}
//     handleEditSubmit={handleEditSubmitFlight}
//     destinations={restaurantDestinations}
//     setFormData={setFlightFormData}
//   />
// )}
//     </div>
//   );
// }
import { Button } from "react-bootstrap";
import Loader from "../Loader";
import RestaurantFormModal from "./ModelForm/RestaurantFormModal";
import HotelFormModal from "./ModelForm/HotelFormModel";
import FlightFormModal from "./ModelForm/FlightFormModal"; 
import CardRow from "./CardRow";
import { useRestaurantHandlers } from "./Handler/useRestaurantHandlers";
import { useHotelHandlers } from "./Handler/useHotelHandlers";
import { useFlightHandlers } from "./Handler/useFlightHandlers";

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
    flights,
    destinations, 
    formData: flightFormData,
    showModal: showFlightModal,
    handleShow: handleShowFlight,
    handleClose: handleCloseFlight,
    handleChange: handleChangeFlight,
    handleSubmit: handleSubmitFlight,
    handleEditSubmit: handleEditSubmitFlight,
    handleDelete: handleDeleteFlight,
    setFormData: setFlightFormData,
    status: flightStatus,
  } = useFlightHandlers();

  const isRestaurant = type === "restaurant";
  const isHotel = type === "hotel";
  const isFlight = type === "flight";

  console.log("Type:", type, "isFlight:", isFlight);
  console.log(hotels, "hotels");
  console.log(flights, "flights");

  if (
    (isRestaurant && restaurantStatus === "loading") ||
    (isHotel && hotelStatus === "loading") ||
    (isFlight && flightStatus === "loading")
  ) {
    return <Loader />;
  }

  if (
    (isRestaurant && restaurantStatus === "failed") ||
    (isHotel && hotelStatus === "failed") ||
    (isFlight && flightStatus === "failed")
  ) {
    return (
      <div>
        Error: {isRestaurant ? restaurantError : isHotel ? hotelError : flightError}
      </div>
    );
  }

  let data = [];
  let headers = [];
  if (isRestaurant) {
    data = restaurants;
    headers = ["Name", "Destination", "Rate", "Date", "Action"];
  } else if (isHotel) {
    data = hotels;
    headers = ["Name", "Destination", "Average Rating", "Total Reviews", "Action"];
  } else if (isFlight) {
    data = flights;
    headers = ["Flight Number", "Origin", "Destination", "Airline", "Duration", "Action"];
  }

  return (
    <div className="table-container p-0 px-2">
      <div className="table-header d-flex justify-content-between align-items-start mb-2">
        <h2 className="table-title fs-5 fw-semibold text-gray-800 m-0">
          {isRestaurant ? "Restaurants" : isHotel ? "Hotels" : "Flights"}
        </h2>
        <Button
          variant="primary"
          onClick={
            isRestaurant ? handleShowRestaurant : isHotel ? handleShowHotel : handleShowFlight
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
      </div>

      <div className="table-container p-0">
        <div className="table-header bg-gray-100 text-gray-700 text-sm d-flex justify-content-between align-items-center p-3 px-0 rounded">
          {headers.map((header, idx) => (
            <div
              className={`table-cell text-small fw-medium
                ${idx === 0 && " d-flex justify-content-start ms-2 "}`}
              key={header}
            >
              {header}
            </div>
          ))}
        </div>

        <div className="table-body text-gray-600 mt-1">
          {data.map((card) => (
            <div key={card._id}>
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
                  } else if (isFlight) {
                    setFlightFormData(card);
                    handleShowFlight();
                  }
                }}
                handleDelete={
                  isRestaurant
                    ? handleDeleteRestaurant
                    : isHotel
                    ? handleDeleteHotel
                    : handleDeleteFlight
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

      {isFlight && (
        <FlightFormModal
          showModal={showFlightModal}
          handleClose={handleCloseFlight}
          handleChange={handleChangeFlight}
          formData={flightFormData}
          handleSubmit={handleSubmitFlight}
          handleEditSubmit={handleEditSubmitFlight}
          destinations={destinations}
          setFormData={setFlightFormData}
        />
      )}
    </div>
  );
}