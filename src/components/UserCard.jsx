import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  async function sendRequest(status, _id) {
    try {
      const res = await axios.post(
        BASE_URL + "request/send/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("resuser", res);
      if (res.status === 200) {
        dispatch(removeUserFromFeed(_id));
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={user.photoURL} alt="photo" className="w-60 h-60 mt-5" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>

        <p>
          {user.age} {user.gender}
          <br />
          {user.about}
        </p>

        <div className="card-actions justify-center">
          <button
            className="btn bg-green-600"
            onClick={() => sendRequest("interested", user?._id)}
          >
            Interested
          </button>
          <button
            className="btn bg-gray-600"
            onClick={() => sendRequest("ignored", user?._id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
