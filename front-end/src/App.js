import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage } from "./Routes";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "./server";
import axios from "axios";

const App = () => {
  useEffect(() => {
    try {
      axios
        .get(`${server}/user/getuser`, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message);
          console.log(res.data);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      // Handle any synchronous errors here
      console.log(error);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login-Page" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
