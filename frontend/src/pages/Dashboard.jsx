/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const Link = import.meta.env.VITE_APP_LINK;
  const navigate = useNavigate();

  const checkToken = useCallback(async (token) => {
    try {
      const response = await axios.post(`${Link}/api/v1/user/me`, {
        token,
      });

      !response.data.valid && navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    checkToken(token);
  }, []);

  return (
    <div>
      <AppBar />
      <Balance />
      <Users />
    </div>
  );
};

export default Dashboard;
