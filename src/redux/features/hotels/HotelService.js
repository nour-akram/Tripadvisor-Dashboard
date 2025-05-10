import api from "../../../services/api";

export const getHotels = async () => {
<<<<<<< HEAD
  const res = await api.get("/hotels");
=======
  const res = await api.get("/hotel");
  console.log(res.data);
  
>>>>>>> 5a00bc7d91aef1cfe559a4492b60a17b712270c5
  return res.data;
};
