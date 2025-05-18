// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;





import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("admin_token"); // غيرت من authToken لـ admin_token
    console.log("Token from cookie:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("No token found in admin_token cookie!");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;