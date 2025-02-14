/**
 * Workspace Service : It will Assume that You have done all the Validation Checks
 */

import { User } from "../models/auth/user.model";

class UserService {
  static async login(email: string, password: string): Promise<any> {
    /**
     * (Login User) Return : User Object Containing User Details
     */
    try {
      const CurrentUser = await User.findOne({ email });
      if (!CurrentUser) return null;
      const isVerified = await CurrentUser.isCorrectPassword(password);
      if (!isVerified) return null;
      return CurrentUser;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getUser(userId: string): Promise<any> {
    /**
     * (Get User By Id) Return : User Object Containing User Details
     */
    try {
      return await User.findById(userId);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getUserByEmail(email: string): Promise<any> {
    /**
     * (Get User By Email) Return : User Object Containing User Details
     */
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<InstanceType<typeof User>> {
    /**
     * (Create User) Return : User Object Containing User Details
     */
    try {
      return await User.create({ name, email, password });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default UserService;
