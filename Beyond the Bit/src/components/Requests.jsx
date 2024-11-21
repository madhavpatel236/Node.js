import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest, showRequests } from "../store/requestSlice";

function Requests() {
  const dispatch = useDispatch();
  const availableRequests = useSelector((store) => store.requests);

  const handleRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(showRequests(res.data.checkRequest));
    } catch (err) {
      console.log("Something went wrong: " + err.message);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleRequests();
  }, []);

  return (
    <div className="flex-col justify-items-center ">
      {availableRequests &&
        availableRequests.map((eachReq) => {
          return (
            <div
              key={eachReq?.fromUserId?._id}
              className="flex justify-center items-center rounded-3xl  w-1/2 bg-base-300 my-5 shadow-xl"
            >
              <figure className="m-2">
                <img
                  className="min-w-56 min-h-56 max-h-56 max-w-56 rounded-full "
                  src={eachReq.fromUserId.photoURL}
                  alt="User"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {eachReq?.fromUserId?.firstName}{" "}
                  {eachReq?.fromUserId?.lastName}
                </h2>
                <p className="line-clamp-2 mb-2">
                  {eachReq?.fromUserId?.about}
                </p>
                {/* {(eachReq?.fromUserId?.skills).map((skillElement) => {
                 console.log(skillElement)
                })} */}
                <div className="card-actions justify-end mt-3">
                  <button
                    onClick={() =>
                      reviewRequest("accept", eachReq?._id)
                    }
                    className="btn hover:bg-green-200 bg-green-600 text-black"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>reviewRequest("reject", eachReq?._id)}
                    className="btn hover:bg-red-300 hover:text-black bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
            // console.log(eachReq.fromUserId)
          );
        })}
    </div>
  );
}

export default Requests;
