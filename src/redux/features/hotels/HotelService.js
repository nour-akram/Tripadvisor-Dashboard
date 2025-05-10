import api from "../../../services/api";

export const getHotels = async () => {
  const res = await api.get("/hotels");

  console.log(res.data);

  return res.data;
};
