import { FaEdit, FaTrash } from "react-icons/fa";
import "./CardRow.css";

export default function CardRow({ card, handleEdit, type }) {
  const handleDelete = () => {};

  return (
    <div className="card-row-container border-0 rounded-2 shadow-sm mb-3">
      <div className="card-row">
        {/* Name */}
        <div className="card-cell name-cell">
          <img
            src={
              type === "restaurant"
                ? card.images?.restaurantImages[0]
                : card.images[0]
            }
            alt={card.name}
            className="card-image border-0"
          />
          <span className="card-name text-truncate">{card.name}</span>
        </div>

        {/* Destination */}
        <div className="card-cell">
          {card.destination || card.destinationId.name}
        </div>

        {/* Rate */}
        <div className="card-cell rate-cell">
          <span className="rate-dots">
            {type === "restaurant" ? (
              [...Array(card.rank)].map((_, index) => (
                <span key={index} className="filled-dot">
                  ●
                </span>
              ))
            ) : (
              <span>{card.averageRating}</span>
            )}
          </span>
        </div>

        {type === "restaurant" ? (
          /* Date */
          <div className="card-cell">
            {new Date(card.updatedAt).toLocaleDateString()}
          </div>
        ) : (
          // "price per night"
          <div className="card-cell">{card.pricePerNight} $</div>
        )}

        {/* Action buttons */}
        <div className="card-cell actions-cell">
          <button
            className="action-button edit"
            onClick={() => handleEdit(card)}
          >
            <FaEdit />
          </button>
          <button className="action-button delete" onClick={handleDelete}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
