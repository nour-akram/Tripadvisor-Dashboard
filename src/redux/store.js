import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./features/hotels/HotelSlice";
import restaurantReducer from "./features/restaurants/restaurantSlice";
import attractionReducer from "./features/attractions/attractionSlice";
import flightReducer from "./features/Flights/flightSlice";
import usersReducer from "./features/users/UserSlice";
import adminReducer from "./features/admin/adminSlice";
import destinationReducer from "./features/Destinations/destinationSlice";
import bookingsReducer from "./features/bookings/bookingSlice";
import reviewsReducer from "./features/reviews/reviewSlice";
import notificationReducer from "./features/notifications/notificationSlice"
import searchReducer from "./features/search/searchSlice"
export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    restaurants: restaurantReducer,
    attractions: attractionReducer,
    flights: flightReducer,
    users: usersReducer,
    admin: adminReducer,
    destinations: destinationReducer,
    bookings: bookingsReducer,
    reviews: reviewsReducer,
    notifications: notificationReducer,
    search: searchReducer,
  },
});
