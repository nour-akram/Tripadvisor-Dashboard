import { Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import "./style.css";

const Index = ({ image, country, name, rating }) => {
  return (
    <Card className="location-card text-white position-relative overflow-hidden border-0 rounded-4">
      <div className="image-wrapper">
        <Card.Img src={image} alt={name} className="card-img img-fluid" />
      </div>
      <div className="position-absolute top-0 end-0 m-2 rating-badge d-flex align-items-center gap-1 px-2 py-1 rounded-3">
        <FaStar size={12} />
        <span className="fw-semibold">{rating}</span>
      </div>
      <Card.ImgOverlay className="d-flex flex-column justify-content-end p-3 gradient-overlay">
        <div className="d-flex align-items-center gap-1 mb-1">
          <FaMapMarkerAlt size={13} />
          <small>{country}</small>
        </div>
        <h6 className="mb-0 fw-bold">{name}</h6>
      </Card.ImgOverlay>
    </Card>
  );
};

export default Index;
