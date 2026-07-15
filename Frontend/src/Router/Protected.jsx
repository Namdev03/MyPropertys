import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Loading from "../components/Loading";

function Protected() {
  const { isLoading, isLoggedIn } = useSelector((store) => store.auth);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default Protected;