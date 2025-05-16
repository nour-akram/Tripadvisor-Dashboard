import { Card, Image, Badge, Container, Row, Col } from "react-bootstrap";
import "./style.css";

const BookingAndReviewCard = ({ data ,typepass}) => {
  // console.log(data,"reviewss");
  
  let status = data?.status || "Waiting";
  const checkInDate = data?.checkIn?.split("T")[0];
  const checkOutDate = data?.checkOut?.split("T")[0];
  const firstName = data?.userId?.firstName || data?.user?.firstName; 
  const lastName=  data?.userId?.lastName || data?.user?.lastName
  const userName = `${firstName} ${lastName}`;

  const review = data?.title;
  const type = data?.type || "Hotel";
  const name =
    data?.reference?.name || data?.reference?.title || data?.reference?.airline;

  const today = new Date();
  const checkIn = data?.checkIn ? new Date(data?.checkIn) : null;
  const checkOut = data?.checkOut ? new Date(data?.checkOut) : null;

  if (checkIn && checkOut) {
    if (checkIn <= today && today <= checkOut) {
      status = "Running";
    } else if (today > checkOut) {
      status = "Done";
    }
  }

  const getBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case "waiting":
        return "secondary";
      case "running":
        return "primary";
      case "done":
        return "success";
      default:
        return "dark";
    }
  };

  return (
    <Card className="shadow-sm p-4 p-md-2 border-0 rounded-3 mb-3">
      <Container fluid>
        <Row className="align-items-center text-muted text-capitalize fw-medium gap-3 gap-md-0">
          <Col sm={12} md={3} className="d-flex align-items-center">
            <Image
              src="/avatar.svg"
              alt="user avatar"
              roundedCircle
              width={30}
              height={30}
              className="me-2 userAvatar"
            />
            <span className="small">{userName}</span>
          </Col>

          <Col md={2} lg={typepass == "review" ? 2 : 1}>
            <span className="small">
              {" "}
              <span className="d-inline d-md-none">Type :</span> {type}
            </span>
          </Col>

          <Col md={2}>
            <span
              className="text-truncate d-block small"
              style={{
                maxWidth: "150px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <span className="d-inline d-md-none">Name :</span> {name}
            </span>
          </Col>
          {typepass === "review" ? (
            <Col md={3} className="text-success">
              {review}
            </Col>
          ) : (
            <>
              <Col md={3}>
                <div className="d-flex align-items-center w-100 justify-content-start gap-2 small text-success">
                  <span>{checkInDate}</span>

                  {checkOutDate && (
                    <>
                      <div className="d-flex align-items-center">
                        <div
                          style={{
                            height: "2px",
                            width: "35px",
                            backgroundColor: "#198754",
                          }}
                        />
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: "5px solid transparent",
                            borderBottom: "5px solid transparent",
                            borderLeft: "7px solid #198754",
                            marginLeft: "4px",
                          }}
                        />
                      </div>

                      <span>{checkOutDate}</span>
                    </>
                  )}
                </div>
              </Col>

              <Col md={1} className="d-none d-lg-flex">
                <Badge
                  bg={getBadgeVariant(status)}
                  className="px-3 py-2 text-capitalize"
                >
                  {status}
                </Badge>
              </Col>
            </>
          )}

          <Col
            md={2}
            className="text-center text-md-end d-flex justify-content-center justify-content-md-end mt-3 mt-md-0"
          >
            {typepass == "review" ? (
              <Image
                src="/review.png"
                alt="Booking visual"
                className="booking-img"
                fluid
                width={45}
                height={45}
              />
            ) : (
              <Image
                src="/booking.png"
                alt="Booking visual"
                className="booking-img"
                fluid
                width={50}
                height={50}
              />
            )}
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default BookingAndReviewCard;
