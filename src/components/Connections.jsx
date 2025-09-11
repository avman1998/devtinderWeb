import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  async function getConnections() {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addConnections(res?.data?.data));
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No connections found.</h1>;
  return (
    <div className="">
      <div className="bg-base-300">
        <h1 className="text-center text-white font-bold">Connections</h1>

        <ul className="list  rounded-box shadow-md">
          {connections?.map((connection) => {
            return (
              <li className="list-row">
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={connection?.photoURL}
                  />
                </div>
                <div>
                  <div>
                    {connection?.firstName} {connection?.lastName}
                  </div>
                  {connection?.age && connection.gender && (
                    <div className="text-xs  font-semibold opacity-60">
                      {`${connection?.age}, ${connection.gender}`}
                    </div>
                  )}
                </div>
                <p className="list-col-wrap text-xs">{connection?.about}</p>
                <button className="btn btn-square btn-ghost">💖</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Connections;
