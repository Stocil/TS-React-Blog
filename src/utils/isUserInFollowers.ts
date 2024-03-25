import { AddToFollowerData } from "../types/user.tsx";

export function isUserInFollowers(
  users: AddToFollowerData[],
  username: string
) {
  let flag = 0;
  users.map((user) => {
    if (user.username === username) {
      flag = 1;
    }
  });

  console.log(username, !!flag);

  return !!flag;
}
