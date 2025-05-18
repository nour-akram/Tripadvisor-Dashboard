import { FaEdit, FaTrash } from "react-icons/fa";
import "./CardRow.css";

const CardRow = ({ card, handleEdit, handleDelete, type }) => {
  const image =
    type === "hotel"
      ? card?.images?.[0]
      : card?.images?.restaurantImages?.[0];
  const name = card?.name || "Unnamed";
// console.log("CardRow image:", image);

  return (
    <div className="card-row-container border-0 rounded-2 shadow-sm mb-3 px-0">
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

        {/* Destination */}
        <div className="card-cell">
          {card?.destination || card?.destinationId?.name || "N/A"}
        </div>

        {type === "restaurant" ? (
          <>
          {/* Rate */}
    <div className="card-cell rate-cell">
    <span className="rate-dots">   {card?.rating ?? "N/A"} ●</span>
    </div>
            {/* Date */}
            <div className="card-cell">
       {card?.createdAt ? new Date(card.createdAt).toLocaleDateString() : "N/A"}            </div>
          </>
        ) : (
          <>
            {/* Average Rating */}
            <div className="card-cell rate-cell">
              <span className="rate-dots">{card?.averageRating ?? "0"} ●</span>
            </div>

            {/* Total Reviews */}
            <div className="card-cell text-success">
              ({card?.totalReviews ?? 0})
            </div>
          </>
        )}

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
};
export default CardRow;