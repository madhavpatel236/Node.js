import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constance";
import Signup from "./Signup";

function Login() {
  const [emailID, setEmailID] = useState("madhav@gmail.com");
  const [password, setPassword] = useState("Madhav@123");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailID,
          password,
        },
        { withCredentials: true }
      );
      const data = dispatch(addUser(res.data));
      // console.log("resData: " + data)
      return navigate("/"); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="card text-primary-content w-96 mb-16 bg-primary flex justify-center align-middle ">
        <div className="card-body  ">
          <h2 className="card-title flex justify-center text-2xl text-white">
            Login
          </h2>

          {/* input fields */}
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">Enter your Email</span>
              </div>
              <input
                type="email"
                className="input input-bordered w-full max-w-xs mb-3 text-white"
                value={emailID}
                onChange={(e) => setEmailID(e.target.value)}
              />

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">
                    Enter your Password
                  </span>
                </div>
                <input
                  type="password"
                  className="input input-bordered w-full max-w-xs text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </label>
          </div>

          <div className="card-actions justify-center mt-5">
            <button className="btn px-5 text-white hover:text-base transition hover:-translate-y-2" onClick={handleLogin}>
              Login
            </button>
          </div>

          <Link to='/signup' className="flex justify-center mt-3 transition hover:translate-y-2 ease-in-out hover:underline text-black font-serif text-lg font-bold  "> Don't have an account sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
