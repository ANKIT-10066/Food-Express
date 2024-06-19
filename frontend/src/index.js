import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Services from "./pages/Services";
import Login from "./pages/Login";
import NewProduct from "./pages/NewProduct";
import DeleteProduct from "./pages/DeleteProduct";
import SignUp from "./pages/SignUp";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="menu/:filterby" element={<Menu />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="login" element={<Login />} />
      <Route path="new-product" element={<NewProduct />} />
      <Route path="delete-product" element={<DeleteProduct/>} />
      <Route path="signUp" element={<SignUp />} />
      <Route path="cart" element={<Cart />} />
      <Route path="success" element={<Success/>}/>
      <Route path="cancel" element={<Cancel/>}/>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
