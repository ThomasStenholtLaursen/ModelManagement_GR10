import { ParseJwt } from "./ParseJwt";

export const getTokenExpiration = (token) => {
  if (!token) return null;
  const parsedToken = ParseJwt(token);
  return parsedToken.exp;
};
