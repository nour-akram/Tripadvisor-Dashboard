import React from "react";
import { Card } from "react-bootstrap";

const index = ({ title, count, image, color }) => {
  return (
    <Card className="rounded-4 p-3  border-0">
      <div className="d-flex align-items-start gap-2">
        <div
          style={{ backgroundColor: color }}
          className="rounded-circle d-flex justify-content-center align-items-center mb-3 p-2"
        >
          <img src={image} alt={title} />
        </div>
        <div className="d-flex flex-column">
          <p className="m-0 mb-1">{title}</p>
          <h4 className="fw-bold fs-5">{count}</h4>
        </div>
      </div>
    </Card>
  );
};

export default index;
