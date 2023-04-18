import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

const ProtectedRoutes = () => {
  const { user } = useContext(GlobalContext);
  
  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoutes;
