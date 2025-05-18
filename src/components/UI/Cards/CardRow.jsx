import { FaEdit, FaTrash } from "react-icons/fa";
import "./CardRow.css";

const CardRow = ({ card, handleEdit, handleDelete, type }) => {
  const image =
    type === "hotel"
      ? card.images?.[0]
      : type === "restaurant"
      ? card.images?.restaurantImages?.[0]
      : type === "attractions"
      ? card.image || card.images?.[0]
      : type === "flight"
      ? card.origin?.images?.[0] || "https://via.placeholder.com/100"
      : "https://via.placeholder.com/100";

  const name =
    type === "flight"
      ? card.flightNumber || "N/A"
      : card.name || card.title || "Untitled";

  const destination =
    type === "flight"
      ? card.destination?.name || "Unknown"
      : typeof card.destination === "object"
      ? card.destination?.name
      : card.destination || card.destinationId?.name || card.location || "—";

  const rating =
    type === "flight" ? null : Number(card.averageRating || card.rating || 0);

  const reviews =
    type === "flight"
      ? null
      : Number(card.totalReviews || card.reviewsCount || 0);

  const airline = type === "flight" ? card.airline || "N/A" : null;
  const duration = type === "flight" ? card.flightDuration || "N/A" : null;

  return (
    <div className="card-row-container border-0 rounded-2 shadow-sm mb-3">
      <div className="card-row d-flex flex-wrap align-items-center">
        <div className="card-cell name-cell p-0 d-flex align-items-center col-12 col-md">
          <img
            src={image}
            alt={name}
            className="card-image img-fluid rounded-2 border-0 me-2"
          />
          <span className="card-name">{name}</span>
        </div>

        <div className="card-cell col-6 col-md text-truncate">
          {destination}
        </div>

        <div className="card-cell rate-cell col-6 col-md text-truncate">
          {type === "flight" ? (
            airline
          ) : (
            <span className="rate-dots">{rating.toFixed(1)} ●</span>
          )}
        </div>

        <div className="card-cell text-success col-6 col-md text-truncate">
          {type === "flight"
            ? `${duration} h`
            : `(${reviews.toLocaleString()})`}
        </div>

        <div className="card-cell actions-cell col-12 col-md-auto d-flex justify-content-start justify-content-md-end mt-2 mt-md-0">
          {handleEdit && (
            <button
              onClick={() => handleEdit(card)}
              className="action-button edit me-2"
            >
              <FaEdit />
            </button>
          )}
          {handleDelete && (
            <button
              onClick={() => handleDelete(card._id)}
              className="action-button delete"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardRow;
