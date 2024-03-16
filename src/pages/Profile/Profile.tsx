import { FC } from "react";
import { Link } from "react-router-dom";

const Profile: FC = () => {
  return (
    <>
      <p>UserPage</p>

      <Link to={"/"}>Home</Link>
    </>
  );
};

export default Profile;
