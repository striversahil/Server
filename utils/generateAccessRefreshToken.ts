import { User } from "../models/auth/user.model";

export default async function generateAccessRefreshToken(
  email: string
): Promise<{ accessToken: string; refreshToken: string }> {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        accessToken: "",
        refreshToken: "",
      };
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("There is an error in generating access and refresh token");
    return {
      accessToken: "",
      refreshToken: "",
    };
  }
}
