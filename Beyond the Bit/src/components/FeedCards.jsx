import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constance";
import { useDispatch } from "react-redux";
import { removeUserFromtheFeed } from "../store/feedSlice";

function FeedCards({ User }) {
  const { firstName, lastName, about, skills, photoURL, gender, _id } = User;
  const dispatch = useDispatch();

  const handleInterest = async (status, userID) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status+ "/" + userID,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromtheFeed(userID));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={photoURL}
            alt="user"
            className="rounded-full w-64 h-64 fill-current"
          />
        </figure>
        <div className="card-body items-center w-auto text-center">
          <h2 className="card-title">
            {" "}
            {firstName} {lastName}{" "}
          </h2>
          <p className="line-clamp-3" >{about}</p>
          {/* <p className="mb-3 line-clamp-1 w-auto  "> {skills} </p> */}
          <div className="card-actions">
            <button
              className="p-2 rounded-lg text-black hover:bg-green-500 font-medium bg-green-600"
              onClick={() => handleInterest("interested", _id)}
            >
              Interested
            </button>
            <button
              className="p-2 rounded-lg hover:bg-red-500 text-black font-medium  bg-red-600"
              onClick={() => handleInterest("ignored", _id)}
            >
              Rejected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedCards;
