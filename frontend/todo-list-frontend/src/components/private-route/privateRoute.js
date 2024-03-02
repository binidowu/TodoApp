import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { TaskContext } from "../../tasks-context/taskContext";

const PrivateRoute = ({ children }) => {
  const ctx = useContext(TaskContext);
  console.log("isLoggedIn", ctx.isLoggedIn);
  if (!ctx.isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default PrivateRoute;
