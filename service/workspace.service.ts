/**
 * Workspace Service : It will Assume that You have done all the Validation Checks
 */

import { User } from "../models/auth/user.model";
import {
  Workspace,
  WorkspaceInterface,
} from "../models/workspace/workspace.model";

class WorkspaceService {
  static async getWorkspace(
    workspaceId: string
  ): Promise<WorkspaceInterface | null> {
    /**
     * (Get Workspace By Id) Return : Workspace Object Containing Workspace with Populated Details
     */
    try {
      return await Workspace.findById(workspaceId)
        .populate("user")
        .populate([
          {
            path: "projects",
            match: { _id: { $exists: true } },
          },
          {
            path: "members",
            match: { _id: { $exists: true } },
          },
        ]);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(userId: string): Promise<WorkspaceInterface | null> {
    /**
     * (Create Workspace) Return : Workspace Object Containing Workspace Details
     */
    try {
      const workspace = new Workspace({ user: userId });
      await workspace.save();
      const user = await User.findByIdAndUpdate(userId, {
        $push: { workspaces: workspace._id },
      });
      if (!user) return null;
      return workspace;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async deleteWorkspace(
    workspaceId: string,
    userId: string
  ): Promise<WorkspaceInterface | null> {
    /**
     * (Delete Workspace) Return : null
     */
    try {
      const workspace = await Workspace.findByIdAndDelete(workspaceId);
      if (!workspace) return null;
      const user = await User.findByIdAndUpdate(userId, {
        $pull: { workspaces: workspaceId },
      });
      if (!user) return null;
      return workspace;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  // static async updateWorkspace(workspaceId: string): Promise<any> {
  //   /**
  //    * (Update Workspace) Return : Workspace Object Containing Workspace Details
  //    */
  //   try {
  //     return await Workspace.findByIdAndUpdate(workspaceId);
  //   } catch (error) {
  //     throw new Error(error as string);
  //   }
  // }
}

export default WorkspaceService;
