import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { adminLogin } from "../../redux/features/admin/adminSlice";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.admin
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container fluid className="d-flex align-items-center p-0">
      <Row className="w-100 m-0">
        <Col md={7} className="d-none d-lg-flex p-0">
          <img
            src="/loginImage.png"
            alt="Tripadvisor Logo"
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
            className="img-fluid"
          />
        </Col>

        <Col
          xs={12}
          lg={5}
          className="d-flex flex-column justify-content-center px-5"
          style={{ height: "100vh" }}
        >
          <h2 className="fw-bold mb-2">Welcome</h2>
          <p className="text-muted mb-4 small">
            Hello, friend! I'm Smarttime-task manager you can trust everything.
            <br />
            Let's get in touch!
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0 rounded-start-pill">
                  <img src="/icons/email.svg" alt="Email Icon" width="16" />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="border-start-0 rounded-end-pill"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0 rounded-start-pill">
                  <img
                    src="/icons/password.svg"
                    alt="Password Icon"
                    width="16"
                  />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="border-start-0 rounded-end-pill"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            {error && (
              <p className="text-danger small mb-3">{error.message || error}</p>
            )}

            <Button
              variant="dark"
              type="submit"
              className="w-100 rounded-pill d-flex justify-content-center align-items-center gap-1"
              disabled={loading}
            >
              <img src="/icons/login.svg" alt="loginIcon" />
              <p className="mb-0">{loading ? "Logging in..." : "LogIn"}</p>
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
