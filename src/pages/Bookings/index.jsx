import { useSelector } from "react-redux";
import BookingAndReviewCard from "../../components/UI/BookingAndReviewCard";
import Loader from "../../components/UI/Loader";
import { Container, Row, Col } from "react-bootstrap";

const Index = () => {
  const {
    data: bookings,
    status,
    error,
  } = useSelector((state) => state.bookings);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Container fluid className="p-0 px-2">
      <Row className="fw-semibold text-muted p-2 mb-2 d-none d-md-flex pb-1">
        <Col md={3}>User Name</Col>
        <Col md={2} lg={1}>
          Type
        </Col>
        <Col md={2}>Name</Col>
        <Col md={3}>Date</Col>
        <Col md={1} className="d-none d-lg-flex">
          Status
        </Col>
        <Col md={2} className="d-flex justify-content-end ">
          Booking
        </Col>
      </Row>

      {bookings.map((booking) => (
        <div key={booking._id}>
          <BookingAndReviewCard data={booking} typepass="booking" />
        </div>
      ))}
    </Container>
  );
};

export default Index;
