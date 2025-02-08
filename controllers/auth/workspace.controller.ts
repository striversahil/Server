const isProduction = process.env.NODE_ENV === "production";

export * from "./workspace/deleteWorkspace";
export * from "./workspace/newWorkspace";
export * from "./workspace/workspaceInfo";

export const workspaceCookie: object = {
  // creating cookie
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days of cookie
};
