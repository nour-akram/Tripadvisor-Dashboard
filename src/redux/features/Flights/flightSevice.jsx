import api from "../../../services/api";

export const getFlights = async () => {
  const res = await api.get("/flights");
  return res.data;
};

