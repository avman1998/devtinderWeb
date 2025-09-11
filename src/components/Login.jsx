import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [data, setData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleChange = useCallback((e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      const res = await axios.post(
        "http://localhost:8888/login",
        {
          emailId: data.emailId,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        dispatch(addUser(res?.data?.data));
        navigate("/");
      }
    } catch (error) {
      setError(error?.response?.data);
      console.error("ERROR: ", error);
    }
  }, [data.emailId, data.password]);

  const handleSignUp = useCallback(async () => {
    try {
      const res = await axios.post(
        BASE_URL + "signup",
        {
          ...data,
        },
        { withCredentials: true }
      );
      console.log("new user response", res);
      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        navigate("/profile");
      }
    } catch (error) {
      setError(error?.response?.data);
      console.error("ERROR: ", error);
    }
  }, [data.emailId, data.password, data.firstName, data.lastName]);

  // if (user) navigate("/");
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{isLogin ? "Login" : "Sign Up"}</h2>
          {!isLogin && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  name="firstName"
                  className="input"
                  value={data.firstName}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  name="lastName"
                  className="input"
                  value={data.lastName}
                  onChange={handleChange}
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email {data.email}</legend>
            <input
              type="email"
              name="emailId"
              className="input"
              value={data.emailId}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              name="password"
              className="input"
              value={data.password}
              onChange={handleChange}
            />
          </fieldset>
          <p className="text-red-400">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="text-center cursor-pointer hover:underline"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin
              ? "New user? Sign up here👉"
              : "Existing user? Login here👉"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
