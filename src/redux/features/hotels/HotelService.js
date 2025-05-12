import api from "../../../services/api";

export const getHotels = async () => {
  const res = await api.get("/hotels");
  return res.data;
};


export const getTopHotels = async () => {
  const response = await api.get("/hotels/topHotels");
  return response.data;
};
