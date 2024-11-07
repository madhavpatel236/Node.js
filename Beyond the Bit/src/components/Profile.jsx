// TODO: add the skills sections in the blocks and solce the array problem which is occure in the DB

import axios from "axios";
import React, { useDebugValue, useState } from "react";
import { BASE_URL } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";

function Profile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [data, setData] = useState("");
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [skills, setSkills] = useState([user?.skills]);
  const [about, setAbout] = useState(user?.about);
  const [showAleart, setShowAleart] = useState(false);

  const [error, setError] = useState();

  // console.log(edit);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setError("");
    const res = await axios.patch(
      BASE_URL + "/profile/edit",
      {
        firstName,
        lastName,
        age,
        about,
        skills,
      },
      { withCredentials: true }
    );
    dispatch(addUser(res?.data?.data));
    setShowAleart(true);
    setTimeout(() => {
      setShowAleart(false);
    }, 1500);

    console.log(res);
  };

  // const handleSkillsAdd = async (e) => {
  //   setError("");
  //   const res = await axios.patch(
  //     BASE_URL + "/profile/edit",
  //     {
  //       skills,
  //     },
  //     { withCredentials: true }
  //   );
  //   dispatch(addUser(skills + [res?.data?.data]));
  // }

  return (
    <div>
      {showAleart == true && (
        <div
          role="alert"
          className="alert alert-success w-96 static mt-7 m-auto "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your profile change successfully </span>
        </div>
      )}

      <div className="flex  mt-10 mx-10 h-[100vh] ">
        {user && (
          <div className="flex justify-center items-center sticky mb-5 top-10 card bg-info text text-info-content w-3/12 h-[70vh]  shadow-xl">
            <figure className="rounded-full w-56 h-56 mt-5">
              <img src={user.photoURL} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className=" text-xl font-bold flex gap-2 ">
                {firstName || user?.firstName} {lastName || user?.lastName}
                <h1 className=" text-sm flex text-info-content mt-auto font-semibold">
                  {age || user?.age}
                </h1>
                {/* <div className="badge badge-secondary">NEW</div> */}
              </h2>
              <div className="line-clamp-3">{about || user?.about}</div>
              {/* { user.skills && skills.forEach((skill) => {
                <div className="badge badge-outline">{skill}</div>
              })} */}
              <div className="card-actions justify-end">
                <div className="badge  bg-blue-700 text-white">{user?.gender}</div>
              </div>
            </div>
          </div>
        )}

        {user && (
          <div className="flex mb-5 ml-10  w-9/12 rounded-3xl bg-base-300 shadow-xl">
            <figure className="px-7 pt-7 w-64 h-64 ">
              <img src={user.photoURL} alt="Shoes" className=" rounded-3xl" />
            </figure>
            <div className="card-body gap-5 max-w-[39vw] ">
              <div className="flex justify-between  ">
                <h2 className="card-title pr-3">First Name :</h2>
                <input
                  type="text"
                  placeholder={user?.firstName}
                  className="input focus:placeholder-transparent focus:border-green-700 "
                  // input-bordered
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="flex justify-between  ">
                <h2 className="card-title pr-3">Last Name :</h2>
                <input
                  type="text"
                  placeholder={user?.lastName}
                  className="input focus:placeholder-transparent focus:border-green-700 " // input-bordered
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex justify-between ">
                <h2 className="card-title"> Email :</h2>
                <input
                  type="text"
                  placeholder={user?.emailID}
                  className="input focus:border-red-700" // input-bordered
                  readOnly
                />
              </div>

              <div className="flex justify-between ">
                <h2 className="card-title"> age :</h2>
                <input
                  type="text"
                  placeholder={user?.age || "Enter your age "}
                  className="input focus:placeholder-transparent focus:border-green-700"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              {user?.gender && (
                <div className="flex justify-between ">
                  <h2 className="card-title"> gender :</h2>
                  <input
                    type="text"
                    placeholder={user?.gender}
                    className="input focus:border-red-700"
                    readOnly
                  />
                </div>
              )}
              {user?.about && (
                <div className="flex justify-between line-clamp-2 ">
                  <h2 className="card-title"> about :</h2>
                  <textarea
                    className=" textarea h-[100px] w-[275px] focus:placeholder-transparent focus:border-green-700 "
                    placeholder={user?.about}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </div>
              )}
              {/* {user?.skills && (
                <div className="flex justify-around ">
                  <h2 className="card-title pr-10"> skills :</h2>
                  <textarea
                    className="textarea h-[100px] w-[200px] focus:placeholder-transparent focus:border-green-700 "
                    placeholder={user?.skills}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  ></textarea>
                  <button
                    className="px-3  bg-red-300"
                    onClick={handleSkillsAdd}
                  >
                    {" "}
                    Add
                  </button>
                </div>
              )} */}
            </div>
            <div className="card-actions flex">
              <button
                className="text-black bg-green-500 mt-4 mr-3 p-2 rounded-xl"
                onClick={handleSubmit}
              >
                Save Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
