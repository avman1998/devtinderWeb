import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addrequests } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";
const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  async function getRequests() {
    try {
      const res = await axios.get(BASE_URL + "user/request/received", {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addrequests(res?.data?.data));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAction(req_id, action) {
    try {
      const res = await axios.post(
        BASE_URL + "request/review/" + action + "/" + req_id,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        getRequests();
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h1>No requests found.</h1>;
  return (
    <div className="">
      <div className="bg-base-300">
        <h1 className="text-center text-white font-bold">Requests</h1>

        <ul className="list  rounded-box shadow-md">
          {requests?.map((request) => {
            const { _id, photoURL, firstName, lastName, age, gender, about } =
              request.fromUserId;
            return (
              <li key={_id} className="list-row">
                <div>
                  <img className="size-10 rounded-box" src={photoURL} />
                </div>
                <div>
                  <div>
                    {firstName} {lastName}
                  </div>
                  {age && gender && (
                    <div className="text-xs  font-semibold opacity-60">
                      {`${age}, ${gender}`}
                    </div>
                  )}
                </div>
                <p className="list-col-wrap text-xs">{about}</p>
                <button
                  className="btn btn-xs  rounded text-xs bg-green-400"
                  onClick={() => handleAction(request._id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="btn btn-xs  rounded text-xs bg-red-400"
                  onClick={() => handleAction(request._id, "rejected")}
                >
                  Reject
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
