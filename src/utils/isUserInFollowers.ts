import { FollowingUserData } from "../types/user.tsx";

export function isUserInFollowers(
  users: FollowingUserData[],
  username: string
) {
  let flag = 0;
  users.map((user) => {
    if (user.username === username) {
      flag = 1;
    }
  });

  return !!flag;
}
