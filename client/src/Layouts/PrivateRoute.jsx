import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../Redux/Features/auth/loginSlice";

const PrivateRoute = () => {
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();

  return (
    <div>
      {currentUser?.isAuthenticated || sessionStorage.getItem("token") ? (
        <Outlet />
      ) : (
        <Navigate to={"/auth/login"} replace={location.pathname} />
      )}
    </div>
  );
};

export default PrivateRoute;
