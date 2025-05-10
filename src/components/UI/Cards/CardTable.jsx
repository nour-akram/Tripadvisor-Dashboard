import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCards } from '../../../redux/features/cards/cardSlice';
import CardRow from './CardRow';

export default function CardTable({ endpoint = '' }) {
  const dispatch = useDispatch();
const { dataByEndpoint, statusByEndpoint, errorByEndpoint } = useSelector(state => state.cards);
const cards = dataByEndpoint[endpoint] || [];
const status = statusByEndpoint[endpoint] || 'idle';
const error = errorByEndpoint[endpoint];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCards(endpoint)); 
    }
  }, [dispatch, status, endpoint]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  if (!Array.isArray(cards)) return <div>No cards available.</div>;

  return (
    <div className="table-container">
      <div className="table-header bg-gray-100 text-gray-700 text-sm">
        <div className="table-row border-b">
          <div className="table-cell p-4">Name</div>
          <div className="table-cell p-4">Destination</div>
          <div className="table-cell p-4">Rate</div>
          <div className="table-cell p-4">Status</div>
          <div className="table-cell p-4">Date</div>
          <div className="table-cell p-4">Action</div>
        </div>
      </div>
      <div className="table-body text-gray-600">
        {cards.map(card => (
          <CardRow key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
