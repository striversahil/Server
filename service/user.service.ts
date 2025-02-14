import { User } from "../models/auth/user.model";

class UserService {
  static async getUser(email: string): Promise<any> {
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
    try {
      return await User.create({ name, email, password });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default UserService;
