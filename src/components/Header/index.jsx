import { io } from "socket.io-client";
import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, Image } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import Sidebar from "../Sidebar";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../redux/features/notifications/notificationSlice";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { profile } = useSelector((state) => state.admin);
  console.log("profile", profile);
  useEffect(() => {
    if (profile) {
      console.log("✅ Admin profile loaded:", profile);
    }
  }, [profile]);

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.list);

  const [hasNew, setHasNew] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // console.log("notifications", notifications);
  const audioRef = useRef(null);

  useEffect(() => {
    document.addEventListener(
      "click",
      () => {
        if (!audioRef.current) {
          audioRef.current = new Audio("/notificationSound.wav");
        }
      },
      { once: true }
    );
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".menu-btn")
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Connected to socket:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
    });

    socket.on("newBooking", (data) => {
      console.log("📨 New booking received:", data);
      setHasNew(true);

      dispatch(fetchNotifications());

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.warn(" Sound failed:", err);
        });
      }
    });

    return () => {
      socket.off("newBooking");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [dispatch]);

  return (
    <>
      <header className="py-1 pb-0 px-3 bg-transparent position-relative sticky-top bg-white z-3">
        <Container fluid>
          <Row className="align-items-center justify-content-between">
            <Col
              xs={8}
              lg={6}
              className="d-flex align-items-center mb-2 mb-md-0   justify-content-between p-lg-0 pe-lg-5"
            >
              <div
                className="d-md-none menu-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <FaBars size={22} />
              </div>

              <Image
                src="/logo.svg"
                alt="Tripadvisor Logo"
                className="me-2 responsive-logo"
                width={140}
                height={58}
              />

              <InputGroup className="search-box w-50 rounded-pill bg-custom px-1 py-1 d-none d-md-flex">
                <InputGroup.Text className="border-0 rounded-pill bg-light me-1">
                  <Image
                    src="/icons/search.svg"
                    alt="Search"
                    width={15}
                    height={15}
                  />
                </InputGroup.Text>
                <Form.Control
                  className="bg-custom border-0 rounded-pill-end shadow-none"
                  placeholder="Search..."
                />
              </InputGroup>
            </Col>

            <Col
              xs={4}
              md="auto"
              className="d-flex align-items-center justify-content-end gap-3"
            >
              <div
                className="position-relative bg-light rounded-circle p-2 d-flex align-items-center justify-content-center cursor-pointer"
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  setHasNew(false);
                }}
              >
                <Image
                  src="/icons/notification.svg"
                  alt="notification"
                  width={20}
                  height={20}
                />
                {hasNew && (
                  <span
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      backgroundColor: "red",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>

              {showDropdown && notifications.length > 0 && (
                <div
                  className="position-absolute bg-white shadow-sm rounded p-3"
                  style={{
                    top: "45px",
                    right: 80,
                    width: "300px",
                    zIndex: 9999,
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  <h6 className="fw-bold mb-2">Notifications</h6>
                  <ul className="list-unstyled m-0">
                    {notifications.map((note, index) => (
                      <li key={index} className="mb-3">
                        <div className="small text-dark fw-semibold">
                          {note.message}
                        </div>
                        <div className="text-muted small">
                          {new Date(note.createdAt).toLocaleString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="d-flex align-items-center bg-light rounded-pill p-2 py-1 position-relative">
                <Image
                  src={profile?.image || "/avatar.svg"}
                  alt="Avatar"
                  width={30}
                  height={30}
                  roundedCircle
                  className="object-fit-cover"
                />
                {profile?.status === "active" && (
                  <span className="active-dot"></span>
                )}
                <span className="ms-2 d-none d-md-flex">
                  {profile?.firstName} {profile?.lastName}
                </span>
              </div>
            </Col>

            <Col xs={12} md="auto" className="d-flex d-md-none my-2">
              <InputGroup className="search-box w-100 rounded-pill bg-custom px-1 py-1">
                <InputGroup.Text className="border-0 rounded-pill bg-light me-1">
                  <Image
                    src="/icons/search.svg"
                    alt="Search"
                    width={15}
                    height={15}
                  />
                </InputGroup.Text>
                <Form.Control
                  className="bg-custom border-0 rounded-pill-end shadow-none"
                  placeholder="Search..."
                />
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </header>

      {sidebarOpen && (
        <div
          ref={sidebarRef}
          className="mobile-sidebar position-fixed top-0 start-0 bg-white shadow-sm z-3"
          style={{ width: "250px", height: "100vh" }}
        >
          <Sidebar onItemClick={() => setSidebarOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
