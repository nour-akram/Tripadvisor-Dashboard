import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DashboardCard from "../../components/UI/DashboardCard";
import {  useSelector } from "react-redux";

const Index = () => {
 
  const { data: hotels } = useSelector((state) => state.hotels);
  const { data: restaurants } = useSelector((state) => state.restaurants);
  const { data: attractions } = useSelector((state) => state.attractions);
  const { data: flights } = useSelector((state) => state.flights);
 
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
    </Container>
  );
};

export default Index;
