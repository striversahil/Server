/**
 * UserCookie
 * Also Here we are Defining for How Long the cookie will be valid
 */

const isProduction = process.env.NODE_ENV === "production";

const Cookies = {
  Usercookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days of cookie
  },

  workspaceCookie: {
    // creating cookie
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days of cookie
  },

  projectCookie: {
    // creating cookie
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 15,
  },
};

export default Cookies;
