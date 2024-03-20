import { FC } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Profile: FC = () => {
  return (
    <>
      <Typography variant="h2">UserPage</Typography>

      <Link to={"/"}>Home</Link>
    </>
  );
};

export default Profile;
