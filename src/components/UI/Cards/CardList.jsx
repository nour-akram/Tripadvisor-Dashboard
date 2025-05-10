import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../features/cards/cardSlice';

const CardList = ({ category }) => {
  const dispatch = useDispatch();
  const { cards, status, error } = useSelector(state => state.cards);

  useEffect(() => {
    const endpoint = category === 'restaurant' ? '/resturants' : '/hotel';
    dispatch(fetchCards(endpoint));
  }, [category, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="card-list">
      {cards.map(card => (
        <div key={card.id} className="card">
          <img src={card.image} alt={card.name} className="card-image" />
          <div>
            <h3>{card.name}</h3>
            <p>{card.destination}</p>
            <p>Rank: {'●'.repeat(card.rank)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
