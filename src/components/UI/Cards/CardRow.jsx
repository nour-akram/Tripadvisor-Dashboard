import { FaEdit, FaTrash } from "react-icons/fa";
import "./CardRow.css";

const CardRow = ({ card, handleEdit, handleDelete, type }) => {
  const image =
    type === "hotel"
      ? card.images?.[0]
      : type === "restaurant"
      ? card.images?.restaurantImages?.[0]
      : card.image || card.images?.[0];

  const name = card.name || card.title || "Untitled";

  const destination =
    typeof card.destination === "object"
      ? card.destination?.name
      : card.destination || card.destinationId?.name || card.location || "—";

  const rating = Number(card.averageRating || card.rating || 0);
  const reviews = Number(card.totalReviews || card.reviewsCount || 0);

  return (
    <div className="card-row-container border-0 rounded-2 shadow-sm mb-3 ">
      <div className="card-row">
        <div className="card-cell name-cell p-0">
          <img
            src={image}
            alt={name}
            className="card-image img-fluid rounded-2 border-0"
          />
          <span className="card-name">{name}</span>
        </div>

        <div className="card-cell">{destination}</div>

        <div className="card-cell rate-cell">
          <span className="rate-dots">{rating.toFixed(1)} ●</span>
        </div>

        <div className="card-cell text-success">
          ({reviews.toLocaleString()})
        </div>

        <div className="card-cell actions-cell">
          {handleEdit && (
            <button
              onClick={() => handleEdit(card)}
              className="action-button edit"
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
