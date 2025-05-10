import { Card, Dropdown } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Index = () => {
  const reviews = [
    {
      label: "Positive",
      count: 165,
      trend: "up",
      color: "success",
      svgId: "green",
    },
    {
      label: "Neutral",
      count: 165,
      trend: "up",
      color: "warning",
      svgId: "yellow",
    },
    {
      label: "Negative",
      count: 165,
      trend: "down",
      color: "danger",
      svgId: "red",
    },
  ];

  const renderTrendIcon = (trend, color) =>
    trend === "up" ? (
      <FaArrowUp className={`text-${color}`} />
    ) : (
      <FaArrowDown className={`text-${color}`} />
    );

  const Items = ["Hotel", "Restaurant", "Atractive", "Flight", "Destination"];
  return (
    <Card className="p-3 rounded-4 shadow-sm border-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-semibold fs-6">Reviews</h5>
        <Dropdown >
          <Dropdown.Toggle
            variant="link"
            className="text-success p-0 text-decoration-none"
          >
            hotel
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Items.map((item, idx) => (
              <Dropdown.Item key={idx} className="text-capitalize">
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {reviews.map((review, idx) => (
        <div
          key={idx}
          className="d-flex align-items-center justify-content-between mb-3"
        >
          <div className="d-flex align-items-center gap-2">
            <svg
              width="50"
              height="24"
              className={`chart chart-${review.svgId}`}
            >
              <polyline
                fill="none"
                stroke={`var(--bs-${review.color})`}
                strokeWidth="2"
                points="0,20 10,10 20,12 30,5 40,10 50,4"
              />
            </svg>
            <span className="fw-medium">{review.label}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">{review.count}</span>
            {renderTrendIcon(review.trend, review.color)}
          </div>
        </div>
      ))}
    </Card>
  );
};

export default Index;
