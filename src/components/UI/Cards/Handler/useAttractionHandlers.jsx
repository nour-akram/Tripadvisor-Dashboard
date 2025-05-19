import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttractions,
  createAttraction,
  updateAttraction,
  deleteAttraction,
} from "../../../../redux/features/attractions/attractionSlice";

export const useAttractionHandlers = () => {
  const dispatch = useDispatch();

  const {
    data: attractions,
    loading,
    error,
  } = useSelector((state) => state.attractions);

  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAttractions());
    console.log( "Attractions fetched successfully" , attractions);
    
  }, [dispatch]);

  const handleCreate = async (newFormData) => {
    await dispatch(createAttraction(newFormData));
    setShowModal(false);
    console.log("Attraction created successfully" , newFormData);
    dispatch(fetchAttractions());
  };

  const handleEditSubmit = async (updatedFormData, id) => {
    await dispatch(updateAttraction({ id, formData: updatedFormData }));
    setShowModal(false);
    dispatch(fetchAttractions());
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this attraction?")) {
      await dispatch(deleteAttraction(id));
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormData(null);
  };

  return {
    attractions,
    status: loading ? "loading" : error ? "failed" : "succeeded",
    error,
    formData,
    setFormData,
    showModal,
    handleShow,
    handleClose,
    handleCreate,
    handleEditSubmit,
    handleDelete,
  };
};
