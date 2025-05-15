import { FaEdit, FaTrash } from "react-icons/fa";
import "./CardRow.css";
const CardRow = ({ card, handleEdit, handleDelete, type }) => {

  
  const image =
    type === "hotel" ? card.images[0] : card.images?.restaurantImages?.[0];
  const name = card.name ;
  // const rating = card.rank || 4;
  // const date = new Date(card.updatedAt).toLocaleDateString();

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
          {card.destination || card.destinationId.name}
        </div>

        {/* Rating */}
        <div className="card-cell rate-cell">
          <span className="rate-dots">
            {/* {[...Array(rating)].map((_, index) => (
              <span key={index} className="filled-dot">
                ●
              </span>
            ))} */}
            {card.averageRating} ●
          </span>
        </div>

        {/* Date
        <div className="card-cell">{date}</div> */}

        {/* total reviews */}
        <div className="card-cell text-success">({card.totalReviews})</div>
        {/* Actions */}
        <div className="card-cell actions-cell">
          <button
            onClick={() => handleEdit(card)}
            className="action-button edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(card._id)}
            className="action-button delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardRow;
