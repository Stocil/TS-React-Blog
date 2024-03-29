export const getToken = (token: string) => {
  if (!token) return undefined;

  return "Token " + token;
};
