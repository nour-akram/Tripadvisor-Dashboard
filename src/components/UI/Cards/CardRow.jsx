// import { FaEdit, FaTrash } from "react-icons/fa";
// import "./CardRow.css";

// const CardRow = ({ card, handleEdit, handleDelete, type }) => {
//   const image =
//     type === "hotel"
//       ? card.images?.[0]
//       : type === "restaurant"
//       ? card.images?.restaurantImages?.[0]
//       : card.image || card.images?.[0];

//   const name = card.name || card.title || "Untitled";

//   const destination =
//     typeof card.destination === "object"
//       ? card.destination?.name
//       : card.destination || card.destinationId?.name || card.location || "—";

//   const rating = Number(card.averageRating || card.rating || 0);
//   const reviews = Number(card.totalReviews || card.reviewsCount || 0);


// // console.log("CardRow image:", image);


//   return (
//     <div className="card-row-container border-0 rounded-2 shadow-sm mb-3 ">
//       <div className="card-row">
//         <div className="card-cell name-cell p-0">
//           <img
//             src={image}
//             alt={name}
//             className="card-image img-fluid rounded-2 border-0"
//           />
//           <span className="card-name">{name}</span>
//         </div>

//         <div className="card-cell">{destination}</div>

//         <div className="card-cell rate-cell">
//           <span className="rate-dots">{rating.toFixed(1)} ●</span>
//         </div>

//         <div className="card-cell text-success">
//           ({reviews.toLocaleString()})
//         </div>

//         <div className="card-cell actions-cell">
//           {handleEdit && (
//             <button
//               onClick={() => handleEdit(card)}
//               className="action-button edit"
//             >
//               <FaEdit />
//             </button>
//           )}
//           {handleDelete && (
//             <button
//               onClick={() => handleDelete(card._id)}
//               className="action-button delete"
//             >
//               <FaTrash />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardRow;
import { FaEdit, FaTrash } from "react-icons/fa";
import "./CardRow.css";

const CardRow = ({ card, handleEdit, handleDelete, type }) => {
  // Determine image based on type
  const image =
    type === "hotel"
      ? card.images?.[0]
      : type === "restaurant"
      ? card.images?.restaurantImages?.[0]
      : type === "attraction"
      ? card.image || card.images?.[0]
      : type === "flight"
      ? card.origin?.images?.[0] || "https://via.placeholder.com/100"
      : "https://via.placeholder.com/100";

  // Determine name based on type
  const name =
    type === "flight" ? card.flightNumber : card.name || card.title || "Untitled";

  // Determine destination or location
  const destination =
    type === "flight"
      ? card.destination?.name || "Unknown"
      : typeof card.destination === "object"
      ? card.destination?.name
      : card.destination || card.destinationId?.name || card.location || "—";

  // Determine rating and reviews (not applicable for flight)
  const rating = type !== "flight" ? Number(card.averageRating || card.rating || 0) : null;
  const reviews = type !== "flight" ? Number(card.totalReviews || card.reviewsCount || 0) : null;

  // Flight-specific rendering
  if (type === "flight") {
    return (
      <div className="card-row-container border-0 rounded-2 shadow-sm mb-3 px-0">
        <div className="card-row">
          {/* Flight Number and Image */}
          <div className="card-cell name-cell p-0">
            <img
              src={image}
              alt={card.flightNumber || "Flight"}
              className="card-image img-fluid rounded-2 border-0"
            />
            <span className="card-name">{card.flightNumber || "N/A"}</span>
          </div>
          {/* From (Origin) */}
          <div className="card-cell">{card.origin?.name || "Unknown"}</div>
          {/* To (Destination) */}
          <div className="card-cell">{card.destination?.name || "Unknown"}</div>
          {/* Airline */}
          <div className="card-cell">{card.airline || "N/A"}</div>
          {/* Duration */}
          <div className="card-cell">{card.flightDuration ? `${card.flightDuration} h` : "N/A"}</div>
          {/* Actions */}
          <div className="card-cell actions-cell">
            <button onClick={() => handleEdit(card)} className="action-button edit">
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(card._id)} className="action-button delete">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Rendering for restaurant, hotel, and attraction
  return (
    <div className="card-row-container border-0 rounded-2 shadow-sm mb-3">
      <div className="card-row">
        {/* Name and Image */}
        <div className="card-cell name-cell p-0">
          <img
            src={image}
            alt={name}
            className="card-image img-fluid rounded-2 border-0"
          />
          <span className="card-name">{name}</span>
        </div>
        {/* Destination/Location */}
        <div className="card-cell">{destination}</div>
        {/* Rating */}
        <div className="card-cell rate-cell">
          <span className="rate-dots">{rating.toFixed(1)} ●</span>
        </div>
        {/* Total Reviews */}
        <div className="card-cell text-success">({reviews.toLocaleString()})</div>
        {/* Actions */}
        <div className="card-cell actions-cell">
          {handleEdit && (
            <button onClick={() => handleEdit(card)} className="action-button edit">
              <FaEdit />
            </button>
          )}
          {handleDelete && (
            <button onClick={() => handleDelete(card._id)} className="action-button delete">
              <FaTrash />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardRow;