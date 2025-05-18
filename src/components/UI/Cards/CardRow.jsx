// import { FaEdit, FaTrash } from "react-icons/fa";
// import "./CardRow.css";
// const CardRow = ({ card, handleEdit, handleDelete, type }) => {

  
//   const image =
//   type === "hotel"
//     ? card.images?.[0]
//     : type === "restaurant"
//     ? card.images?.restaurantImages?.[0]
//     : type === "flight"
//     ? card.origin?.images?.[0] 
//     : null;
//     // type === "hotel" ? card.images[0] : card.images?.restaurantImages?.[0];
//   const name = card.name ;
//   // const rating = card.rank || 4;
//   // const date = new Date(card.updatedAt).toLocaleDateString();
//   //myedit
//   if (type === "flight") {
//     return (
//       <div className="card-row-container border-0 rounded-2 shadow-sm mb-3 px-0">
//         <div className="card-row">
//           {/* Flight Number */}
// {/* <div className="card-cell name-cell p-0">
//   <img
//     src={card.destination?.images?.[0]}
//     alt={card.flightNumber}
//     className="card-image img-fluid rounded-2 border-0"
//   />
// </div>          From */}
//   {/* Flight Number and Image */}
//           <div className="card-cell name-cell p-0">
//             <img
//               src={image} // الصورة من origin.images[0]
//               alt={card.flightNumber}
//               className="card-image img-fluid rounded-2 border-0"
//             />
//             <span className="card-name">{card.flightNumber}</span> {/* عرض رقم الرحلة */}
//           </div>   
//           <div className="card-cell">{card.origin?.name}</div>
//           {/* To */}
//           <div className="card-cell">{card.destination?.name}</div>
//           {/* Airline */}
//           <div className="card-cell">{card.airline}</div>
//           {/* Duration */}
//           <div className="card-cell">{card.flightDuration} h</div>
//           {/* Actions */}
//           <div className="card-cell actions-cell">
//             <button
//               onClick={() => handleEdit(card)}
//               className="action-button edit"
//             >
//               <FaEdit />
//             </button>
//             <button
//               onClick={() => handleDelete(card._id)}
//               className="action-button delete"
//             >
//               <FaTrash />
//                </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   //endmyedit

//   return (
//     <div className="card-row-container border-0 rounded-2 shadow-sm mb-3 px-0">
//       <div className="card-row">
//         {/* Name and Image */}
//         <div className="card-cell name-cell p-0">
//           <img
//             src={image}
//             alt={name}
//             className="card-image img-fluid rounded-2 border-0"
//           />
//           <span className="card-name">{name}</span>
//         </div>

//         {/* Destination */}
//         <div className="card-cell">
//           {card.destination || card.destinationId.name}
//         </div>

//         {/* Rating */}
//         <div className="card-cell rate-cell">
//           <span className="rate-dots">
//             {/* {[...Array(rating)].map((_, index) => (
//               <span key={index} className="filled-dot">
//                 ●
//               </span>
//             ))} */}
//             {card.averageRating} ●
//           </span>
//         </div>

//         {/* Date
//         <div className="card-cell">{date}</div> */}

//         {/* total reviews */}
//         <div className="card-cell text-success">({card.totalReviews})</div>
//         {/* Actions */}
//         <div className="card-cell actions-cell">
//           <button
//             onClick={() => handleEdit(card)}
//             className="action-button edit"
//           >
//             <FaEdit />
//           </button>
//           <button
//             onClick={() => handleDelete(card._id)}
//             className="action-button delete"
//           >
//             <FaTrash />
//           </button>
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
      : type === "flight"
      ? card.origin?.images?.[0] || "https://via.placeholder.com/100" 
      : null;

  // Determine name based on type
  const name = type === "flight" ? card.flightNumber : card.name;

  // Flight-specific rendering
  if (type === "flight") {
    return (
      <div className="card-row-container border-0 rounded-2 shadow-sm mb-3 px-0">
        <div className="card-row">
          {/* Flight Number and Image */}
          <div className="card-cell name-cell p-0">
            <img
              src={image || "https://via.placeholder.com/100"} // Ensure fallback
              alt={card.flightNumber || "Flight"}
              className="card-image img-fluid rounded-2 border-0"
            />
            <span className="card-name">{card.flightNumber || "N/A"}</span> {/* Flight Number */}
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
  }

  // Original logic for hotel and restaurant (unchanged)
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