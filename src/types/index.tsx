export type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};
export type PartialUser = Partial<User>;