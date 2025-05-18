import { Modal, Button } from "react-bootstrap";

import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../redux/features/admin/adminSlice";

const LogoutModal = ({ onClose }) => {
    const dispatch = useDispatch();
  const handleLogout = () => {
      Cookies.remove("admin_token");
      dispatch(adminLogout());
   
  };

  
    
  return (
    <Modal show onHide={onClose} centered backdrop="static">
      <Modal.Body className="text-center py-5">
        <button
          className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3"
          onClick={onClose}
        >
          <IoClose size={20} />
        </button>
        <h5 className="mb-3 fw-bold">Oh no! You're leaving...</h5>
        <p className="mb-4">Are you sure?</p>
        <div className="d-flex justify-content-center gap-3">
          <Button
            variant="dark"
            className="px-4 rounded-pill"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="px-4 rounded-pill"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
