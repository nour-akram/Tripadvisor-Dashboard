import  {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDestination,
  updateDestination,
  deleteDestination,
} from "../../redux/features/Destinations/destinationSlice";
import ProfileCard from "../../components/UI/userCard/index";
import DestinationForm from "./DestinationForm/DestinationForm";
import Loader from "../../components/UI/Loader";
 
const DestinationPage = () => {
  const dispatch = useDispatch();
  const {
    data: destinations,
    loading,
    error,
  } = useSelector((state) => state.destinations);

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  

  const handleAddClick = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (destination) => {
    setEditData(destination);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(" Are you sure you want to delete this destination?")) {
      dispatch(deleteDestination(id));
    }
  };

  const handleSubmit = (formData, id) => {
    if (id) {
      dispatch(updateDestination({ id, formData }));
    } else {
      dispatch(createDestination(formData));
    }
    setShowForm(false);
  };

   if (loading) return <Loader />;
  if (error) return <div className="text-center text-danger py-5">{error}</div>;
  
  return (
    <div className="container py-0">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fw-bold mb-0 fs-5">Destinations ({destinations.length})</h2>
        <button
          className="btn btn-secondary d-flex align-items-center"
          onClick={handleAddClick}
          style={{ gap: "0.5rem" }}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          Add
        </button>
      </div>

      {loading && <div className="text-center py-5"> Loading...</div>}
      {error && <div className="text-center text-danger py-5">{error}</div>}

      <div className="row g-4">
        {destinations.map((destination) => (
          <div key={destination._id} className="col-md-6 col-lg-4 col-xl-3">
            <ProfileCard
              destination={destination}
              onEdit={() => handleEdit(destination)}
              onDelete={() => handleDelete(destination._id)}
            />
          </div>
        ))}
      </div>

      {showForm && (
        <DestinationForm
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          initialData={editData}
        />
      )}
    </div>
  );
};

export default DestinationPage;
