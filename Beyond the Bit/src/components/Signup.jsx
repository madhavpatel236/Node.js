import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constance";

function Signup() {
  const [emailID, setEmailID] = useState("madhav123@gmail.com");
  const [password, setPassword] = useState("Madhav@123");
  const [firstName, setFirstName] = useState("manthan");
  const [lastName, setLastName] = useState("patel");
  const [gender, setGender] = useState("male");
  const [photoURL, setPhotoURL] = useState("https://pbs.twimg.com/profile_images/1762434024583364608/eNGvJ-GO_400x400.jpg");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await axios.post(
      BASE_URL + "/lsignup",
      { firstName, lastName, emailID, password, photoURL, gender },
      { withCredentials: true }
    );
    navigate('/login')

    console.log(res);
  };

  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="card mt-16 text-primary-content w-96 mb-16 bg-primary flex justify-center align-middle ">
        <div className="card-body  ">
          <h2 className="card-title flex justify-center text-2xl text-white">
            Signup
          </h2>

          {/* input fields */}
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">
                  Enter your FirstName:
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs text-white"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">
                  Enter your LastName:
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs text-white"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">
                  Enter your gender:
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs text-white"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </label>

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

              <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">
                  Enter your PhotoURL:
                </span>
              </div>
              <input
                type="url"
                className="input input-bordered w-full max-w-xs text-white"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </label>

              
            </label>
          </div>

          <div className="card-actions justify-center mt-5">
            <button
              className="btn px-5 text-white hover:text-base transition hover:-translate-y-2"
              onClick={handleSignup}
            >
              Signup
            </button>
          </div>

          {/* <Link
            to="/signup"
            className="flex justify-center mt-3 transition hover:translate-y-2 ease-in-out hover:underline text-black font-serif text-lg font-bold  "
          >
            {" "}
            Login
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
