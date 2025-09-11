import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  async function fetchProfile() {
    if (user) return;
    try {
      const res = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) navigate("/login");
      else console.error("ERROR: ", error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Body;
