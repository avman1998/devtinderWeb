import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import UserCard from "./UserCard";
const EditProfile = ({ profile }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    photoURL: profile?.photoURL,
    about: profile?.about,
    age: profile?.age,
    gender: profile?.gender,
  });
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setData({
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      photoURL: profile?.photoURL,
      about: profile?.about,
      age: profile?.age,
      gender: profile?.gender,
    });
  }, [profile]);
  function handleChange(e) {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSave() {
    setError(null);
    try {
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        { ...data },
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        setShowToast(true);
        dispatch(addUser(res?.data?.data));
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (error) {
      setError(error?.response?.data);
    }
  }

  return (
    <>
      <div className="flex justify-center my-10 gap-10">
        <div className="flex justify-center">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  name="firstName"
                  className="input"
                  value={data?.firstName}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  name="lastName"
                  className="input"
                  value={data?.lastName}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  type="text"
                  name="photoURL"
                  className="input"
                  value={data.photoURL}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  className="textarea"
                  name="about"
                  value={data?.about}
                  onChange={handleChange}
                ></textarea>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  name="age"
                  className="input"
                  value={data?.age}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  name="gender"
                  className="input"
                  value={data?.gender}
                  onChange={handleChange}
                />
              </fieldset>
              <p className="text-red">{error}</p>
              <p className="text-red-400">{error}</p>
              <div className="card-actions justify-center">
                <button onClick={handleSave} className="btn bg-blue-400">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={data} />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-10000">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
