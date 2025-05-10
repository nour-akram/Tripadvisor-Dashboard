import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DashboardCard from "../../components/UI/DashboardCard";
import { useSelector } from "react-redux";
import CalendarComponent from "../../components/UI/Calender";
import UserSlider from "../../components/UI/UserSlider";
import BookingChart from "../../components/UI/BookingChart";
import DonutChart from "../../components/UI/DonutChart";
import ReviewSummary from "../../components/UI/ReviewSummary";
import "./style.css";
const Index = () => {
  const { data: hotels } = useSelector((state) => state.hotels);
  const { data: restaurants } = useSelector((state) => state.restaurants);
  const { data: attractions } = useSelector((state) => state.attractions);
  const { data: flights } = useSelector((state) => state.flights);
  const { data: users, statistics } = useSelector((state) => state.users);
  const cardsData = [
    {
      title: "Total Hotels",
      count: hotels.length,
      image: "/hotel-bed.png",
      color: "#FFF5D9",
    },
    {
      title: "Total Restaurant",
      count: restaurants.length,
      image: "/fork.png",
      color: "#E7EDFF",
    },
    {
      title: "Total Attractives",
      count: attractions.length,
      image: "/camera.png",
      color: "#FFE0EB",
    },
    {
      title: "Total Flights",
      count: flights.length,
      image: "/airplane.png",
      color: "#DCFAF8",
    },
  ];

  // console.log("statistics", statistics);

  return (
    <Container className="py-0">
      <Row className="g-3">
        {cardsData.map((card, index) => (
          <Col key={index} xs={12} sm={6} lg={3}>
            <DashboardCard
              title={card.title}
              count={card.count}
              image={card.image}
              color={card.color}
            />
          </Col>
        ))}
      </Row>

      <Row className="mt-3 align-items-start">
        <Col xs={12} lg={4}>
          <CalendarComponent />
        </Col>
        <Col xs={12} lg={8} className="d-flex flex-column gap-2">
          <UserSlider users={users} />
          <Row className="align-items-start mt-2 mt-lg-0 gap-0">
            <Col xs={12} md={8}>
              <BookingChart />
            </Col>
            <Col xs={12} md={4} className=" mt-3 mt-md-0 ">
              <DonutChart statistics={statistics} />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs={12} md={6} lg={4}>
          <ReviewSummary/>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
