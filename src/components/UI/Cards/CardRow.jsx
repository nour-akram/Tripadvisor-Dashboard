import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import './CardRow.css';
const CardRow = ({ card, handleEdit, handleDelete}) => {
  const image = card.images?.restaurantImages?.[0] || "https://via.placeholder.com/100";
  const name = card.name || "N/A";
  const rating = card.rank || 4;
  const date = new Date(card.updatedAt).toLocaleDateString();

  return (
 <div className="card-row-container border-0 rounded-2 shadow-sm mb-3">
      <div className="card-row">
        {/* Name and Image */}
        <div className="card-cell name-cell">
          <img
            src={image}
            alt={name}
            className="card-image"
          />
          <span className="card-name">{name}</span>
        </div>

        {/* Destination */}
        <div className="card-cell">{card.destination || "N/A"}</div>

        {/* Rating */}
        <div className="card-cell rate-cell">
          <span className="rate-dots">
            {[...Array(rating)].map((_, index) => (
              <span key={index} className="filled-dot">●</span>
            ))}
          </span>
        </div>

        {/* Date */}
        <div className="card-cell">{date}</div>

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
