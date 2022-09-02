import React from "react";
import TopNav from "./Nav";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { IconButton } from '@mui/material';


const Profile = () => {
    const { logOut } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <>
    <TopNav/>
      <div className="p-4 box mt-3 text-center">
      <IconButton variant="primary" onClick={handleLogout}>
                    Click here to log out
        </IconButton>
      </div>
    </>
  );
};

export default Profile;
