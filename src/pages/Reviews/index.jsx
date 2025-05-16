import { useSelector } from "react-redux";
import BookingAndReviewCard from "../../components/UI/BookingAndReviewCard";
import Loader from "../../components/UI/Loader";
import { Container, Row, Col } from "react-bootstrap";

const Index = () => {
  const {
    data: reviews,
    status,
    error,
  } = useSelector((state) => state.reviews);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Container fluid className="p-0 px-2">
      <Row className="fw-semibold text-muted p-2 mb-2 d-none d-md-flex pb-1">
        <Col md={3}>User Name</Col>
        <Col md={2} lg={2}>
          Type
        </Col>
        <Col md={2}>Name</Col>
        <Col md={3}>
          Review  title
        </Col>
        <Col md={2} className="d-flex justify-content-end ">
          Review
        </Col>
      </Row>

      {reviews.map((review) => (
        <div key={review._id}>
          <BookingAndReviewCard data={review} typepass="review"/>
        </div>
      ))}
    </Container>
  );
};

export default Index;
