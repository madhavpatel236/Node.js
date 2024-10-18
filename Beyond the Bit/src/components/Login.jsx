import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [emailID, setEmailID] = useState("madhav@gmail.com");
  const [password, setPassword] = useState("Madhav@123");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:1818/login",
        {
          emailID,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data))
      return navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="card text-primary-content w-96 mb-16 bg-secondary flex justify-center align-middle ">
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
            <button className="btn px-5 text-white" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
