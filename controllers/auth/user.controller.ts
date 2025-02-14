import { User } from "../../models/auth/user.model";
export * from "./user/registerUser";
export * from "./user/signIn";
export * from "./user/userInfo";

export type UserType = {
  name?: string;
  email: string;
  password: string;
};

const isProduction = process.env.NODE_ENV === "production";
export const Usercookie: object = {
  // creating cookie
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days of cookie
};
