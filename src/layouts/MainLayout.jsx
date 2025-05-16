import  { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { fetchHotels, fetchTopHotels } from "../redux/features/hotels/HotelSlice";
import { fetchRestaurants } from "../redux/features/restaurants/restaurantSlice";
import { fetchAttractions } from "../redux/features/attractions/attractionSlice";
import { fetchFlights } from "../redux/features/Flights/flightSlice";
import { fetchUsers, fetchUserStatistics } from "../redux/features/users/UserSlice";
import { getAdminProfile } from "../redux/features/admin/adminSlice";
import { fetchDestinations } from "../redux/features/Destinations/destinationSlice";
import { fetchBookings } from "../redux/features/bookings/bookingSlice";
import { fetchReviews } from "../redux/features/reviews/reviewSlice";

const Index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotels());
    dispatch(fetchRestaurants());
    dispatch(fetchAttractions());
    dispatch(fetchFlights());
    dispatch(fetchUsers())
    dispatch(fetchUserStatistics())
    dispatch(getAdminProfile());
    dispatch(fetchDestinations())
    dispatch(fetchTopHotels())
    dispatch(fetchBookings());
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={2} className="p-0 d-none d-md-block">
            <Sidebar />
          </Col>
          <Col xs={12} md={9} lg={10} className="p-3">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
