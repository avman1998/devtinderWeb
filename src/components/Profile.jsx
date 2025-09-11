import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <EditProfile profile={user} />
    </div>
  );
};

export default Profile;
