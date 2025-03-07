export * from "./deleteProject";
export * from "./newProject";
export * from "./projectInfo";
export * from "./updateName";

const isProduction = process.env.NODE_ENV === "production";

export const projectCookie: object = {
  // creating cookie
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 15,
};
