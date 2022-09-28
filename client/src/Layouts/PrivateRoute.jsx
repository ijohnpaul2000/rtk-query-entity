import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../Redux/Features/auth/loginSlice";
import { api } from "../Redux/api";
const PrivateRoute = () => {
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();
  const navigate = useNavigate();
  // const [userToken, setUserToken] = useState();

  let auth = sessionStorage.getItem("token") ? true : false;

  if (auth) {
    navigate("/");
  }

  return auth ? <Outlet /> : <Navigate to={`/auth/login`} />;
};

export default PrivateRoute;
