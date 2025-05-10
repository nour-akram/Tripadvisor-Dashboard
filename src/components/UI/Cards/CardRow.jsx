import { useDispatch } from 'react-redux';
import { deleteCard } from '../../../redux/features/cards/cardSlice';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash } from 'react-icons/fa';
import './CardRow.css';

export default function CardRow({ card }) {
  const dispatch = useDispatch();

  return (
    <div className="card-row-container border rounded-3 shadow-sm mb-3">
      <div className="card-row">
        {/* Name */}
        <div className="card-cell name-cell">
          <img src={card.image} alt={card.name} className="card-image" />
          <span className="card-name">{card.name}</span>
        </div>

        {/* Destination */}
        <div className="card-cell">{card.destination}</div>

        {/* Rate */}

  <div className="card-cell rate-cell">
          <span className="rate-dots">
            {[...Array(card.rank)].map((_, index) => (
              <span key={index} className="filled-dot">
                ●
              </span>
            ))}
          </span>
        </div>


        {/* Status */}
        <div className="card-cell">
          {card.status ? (
            <FaCheckCircle className="status-icon success" />
          ) : (
            <FaTimesCircle className="status-icon fail" />
          )}
        </div>

        {/* Date */}
        <div className="card-cell">{card.date}</div>

        {/* Action buttons */}
        <div className="card-cell actions-cell">
          <button className="action-button edit">
            <FaEdit />
          </button>
          <button className="action-button delete" onClick={() => dispatch(deleteCard(card.id))}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
