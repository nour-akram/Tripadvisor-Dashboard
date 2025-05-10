import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./features/hotels/HotelSlice";
import restaurantReducer from "./features/restaurants/restaurantSlice";
import attractionReducer from "./features/attractions/attractionSlice";
import flightReducer from "./features/Flights/flightSlice";
import usersReducer from "./features/users/UserSlice";
import adminReducer from "./features/admin/adminSlice";
export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    restaurants: restaurantReducer,
    attractions: attractionReducer,
    flights: flightReducer,
    users: usersReducer,
    admin: adminReducer,
  },
});
