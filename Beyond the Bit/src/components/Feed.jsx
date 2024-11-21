import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { showFeed } from "../store/feedSlice";
import FeedCards from "./FeedCards";

function Feed() {
  const dispatch = useDispatch();
  const userfeedList = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(showFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if(!userfeedList) return
  if (userfeedList.length <= 0) {
    return (
      <div className=" flex justify-center items-center text-red-500 font-bold text-3xl h-[56vh]">
        There are no feed
      </div>
    );
  }

  return (
    userfeedList && (
      <div className="flex-col justify-items-center mx-5 my-5 ">
        <FeedCards User={userfeedList[0]} />
      </div>
    )
  );
}

export default Feed;
