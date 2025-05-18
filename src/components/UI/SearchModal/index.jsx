import { Modal, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeSearchModal } from "../../../redux/features/search/searchSlice";

const SearchModal = () => {
  const dispatch = useDispatch();
  const { isOpen, results, loading, error } = useSelector(
    (state) => state.search
  );

    console.log(results,"result");

  return (
    <Modal
      show={isOpen}
      onHide={() => dispatch(closeSearchModal())}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <Spinner animation="border" />}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !results.length && <p>No results found.</p>}
        {!loading &&
          results.map((item) => (
            <div
              key={item._id || item.id}
              className="shadow-sm py-2 d-flex align-items-center gap-3 my-3"
            >
              <img
                src={
                  item.image ||
                  item.images?.[0] ||
                  item.images?.restaurantImages?.[0]
                }
                alt={item.name}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div>
                <h5>{item.name || item.title}</h5>
                <p className="small">{item.description || item.location}</p>
              </div>
            </div>
          ))}
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;
