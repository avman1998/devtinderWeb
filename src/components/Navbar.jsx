import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser, removeUser } from "../utils/userSlice";
import axios from "axios";
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      const res = await axios.post(BASE_URL + "logout");
      if (res.status === 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {}
  }
  return (
    <div className="navbar bg-base-300 shadow-sm sticky top-0 z-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          {" "}
          🧑‍💻DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User photo"
                  src={
                    user?.photoURL ??
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Requests
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
