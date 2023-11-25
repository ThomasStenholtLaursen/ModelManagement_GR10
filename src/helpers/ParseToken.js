import { ParseJwt } from "./ParseJwt";

export const parseTokenToUser = (token) => {
  if (!token) return null;

  return {
    ...ParseJwt(token),
    role: ParseJwt(token)[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ],
    email:
      ParseJwt(token)[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ],
  };
};
