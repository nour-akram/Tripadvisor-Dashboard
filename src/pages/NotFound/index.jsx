import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid  text-white vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "black" }}
    >
      <div className="row w-100">
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-start px-5 py-0 p-md-5">
          <h1 className="display-4 fw-bold mb-3">
            Meet the 404th wonder of the world.
          </h1>
          <p className="lead mb-4">Plan a trip.</p>
          <div className="d-grid gap-3 w-100" style={{ maxWidth: "300px" }}>
            <button
              className="btn btn-light rounded-pill"
              onClick={() => navigate("/hotels")}
            >
              Hotels
            </button>
            <button
              className="btn btn-light rounded-pill"
              onClick={() => navigate("/restaurants")}
            >
              Restaurants
            </button>
            <button
              className="btn btn-light rounded-pill"
              onClick={() => navigate("/attractions")}
            >
              Things to Do
            </button>
            <button
              className="btn btn-light rounded-pill"
              onClick={() => navigate("/flights")}
            >
              Flights
            </button>
          </div>
        </div>

        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center px-4 py-0 p-md-5 mt-2 m-md-0">
          <img
            src="/loader.gif"
            alt="Suitcase"
            className="img-fluid"
            style={{ maxWidth: "70%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
