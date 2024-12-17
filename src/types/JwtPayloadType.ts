export type JwtPayloadType = {
  iat: number;
  exp: number;
  roles: string[];
  username: string;
};
