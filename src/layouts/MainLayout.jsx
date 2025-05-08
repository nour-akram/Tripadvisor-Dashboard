import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
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

export default MainLayout;
