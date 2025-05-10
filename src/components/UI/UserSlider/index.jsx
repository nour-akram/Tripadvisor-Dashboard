import { Image, Spinner } from "react-bootstrap";
import Slider from "react-slick";
import "./style.css";

const Index = ({ users }) => {
  console.log(users);
  
  const settings = {
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 8,
    speed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
    ],
  };

  const isLoading = !users || !users.users || users.users.length === 0;

  return (
    <div
      className="border-0 bg-light p-3 rounded-4 w-100 px-4 shadow-sm  mt-3 mt-lg-0"
      style={{ maxWidth: "700px", margin: "auto" }}
    >
      <p className="m-0 mb-2 fs-6 fw-semibold">Users</p>

      {isLoading ? (
        <div className="text-center py-4">
          <Spinner animation="border" size="sm" className="me-2" />
          Loading users...
        </div>
      ) : (
        <Slider {...settings} className="d-flex justify-content-center ">
          {users.users.map((user) => (
            <div
              key={user._id}
              className="d-flex flex-column justify-content-center align-items-center "
            >
              <Image
                src={user.image || "/avatar.svg"}
                roundedCircle
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
              <div className="small mt-1">
                {user.firstName || user.lastName || user.username}
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Index;
