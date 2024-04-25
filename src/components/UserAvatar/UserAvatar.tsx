import { FC } from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { DEF_AVATAR, PROFILE_URL } from "../../constants";

type UserAvatarProps = {
  username: string;
  userImage: string | undefined;
};

const UserAvatar: FC<UserAvatarProps> = ({ username, userImage }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography>{username}</Typography>

      <Link to={PROFILE_URL}>
        <Avatar alt="avatar" src={userImage ? userImage : DEF_AVATAR} />
      </Link>
    </Stack>
  );
};

export default UserAvatar;
