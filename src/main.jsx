import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';


import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App/>
  </Provider>
);
Modal.setAppElement('#root');
