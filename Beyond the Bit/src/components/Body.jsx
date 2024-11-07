import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constance.js";
import {addUser} from '../store/userSlice.js'

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchedUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(
        BASE_URL + "/profile/view",
        { withCredentials: true }
      );
      // console.log("res : " + res.data)
       dispatch(addUser(res.data));
    } catch (err) {
      if(err.status == 401){
        navigate("/login")
      }
      console.log(err);
    }
  };

  useEffect(() => {
    fetchedUser();
  }, []);


  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
