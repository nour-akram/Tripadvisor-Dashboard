import api from "../../../services/api";

export const getHotels = async () => {
  const res = await api.get("/hotel");
  console.log(res.data);
  
  return res.data;
};
