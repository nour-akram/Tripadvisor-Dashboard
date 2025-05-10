import React from 'react'
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import CardTable from '../../components/UI/Cards/CardTable';

const index = () => {



  
  return (
      <Provider store={store}>
      <div >
  <CardTable endpoint="/hotel" type="hotel"  />
      </div>
    </Provider>
  )
}

export default index
// import React, { useState, useEffect } from 'react';
// import { Provider } from 'react-redux';
// import { store } from '../../redux/store';
// import CardTable from '../../components/UI/Cards/CardTable';
// import { getHotels } from '../../redux/features/hotels/HotelService';

// const Index = () => { // Renamed to start with an uppercase letter
//   const [hotelData, setHotelData] = useState(null);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const data = await getHotels();
//         setHotelData(data);
//       } catch (error) {
//         console.error('Error fetching hotel data:', error);
//       }
//     };

//     fetchHotels();
//   }, []);

//   if (!hotelData) return <div>Loading...</div>;

//   return (
//     <Provider store={store}>
//       <div>
//         <CardTable endpoint="/hotel" data={hotelData} />
//       </div>
//     </Provider>
//   );
// };

// export default Index;