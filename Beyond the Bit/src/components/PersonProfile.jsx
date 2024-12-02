import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constance";

function PersonProfile() {
  const dispatch = useDispatch();
  const person = useSelector((store) => store.feed);

  const { _id, firstName, lastName, about, skills, photoURL, gender, age } =
    person[0];

  return (
    <div className="w-screen">
      <div className="hero   bg-base-100 min-h-screen">
        <div className="hero-content flex justify-around bg-base-300 rounded-3xl w-4/6  flex-col lg:flex-row">
          <div className=" mr-4 ml-5 ">
            <img src={photoURL} className="min-w-72 min-h-72 max-w-72 max-h-72 rounded-full  shadow-2xl" />
          </div>

          <div className=" p-10 flex-col ">
            <h1 className="text-5xl pr-10">
              {firstName} {lastName}
            </h1>
            <p  className="text-xl  " > {gender} </p>

            <p className="py-6 line-clamp-5 font-thin  ">{about}</p>
            <p className="text-xl mt-3 text-primary font-bold " > {skills} </p>
            <p>{age} </p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonProfile;
