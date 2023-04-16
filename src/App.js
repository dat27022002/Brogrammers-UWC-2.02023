import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GlobalContext from "./context/GlobalContext"
import { useContext } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import EmployeesList from "./components/employeesList/EmployeesList";
import EmployeeProfile from "./components/employeeProfile/EmployeeProfile";
import AssignTask from "./components/assignTask/AssignTask";
import Chat from "./components/chat/Chat";
import TrucksList from "./components/trucksList/TrucksList";
import TrollersList from "./components/trollersList/TrollersList";
import MCPsList from "./components/mcpsList/MCPsList";
import Login from "./components/login/Login";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ErrorPage from "./components/errorPage/ErrorPage";
import Conversation from "./components/conversation/Conversation";

function App() {
  const { user } = useContext(GlobalContext);
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/emp-list" element={<EmployeesList />} />
          <Route path="/emp-info/:id" element={<EmployeeProfile />} />
          <Route path="/assign" element={<AssignTask />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/conversation/:id" element={<Conversation />} />
          <Route path="/vehicles/trollers" element={<TrollersList />} />
          <Route path="/vehicles/trucks" element={<TrucksList />} />
          <Route path="/mcps" element={<MCPsList />} />
        </Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/forgot" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
