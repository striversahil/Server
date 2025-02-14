/**
 * Workspace Service : It will Assume that You have done all the Validation Checks
 */

import { Workspace } from "../models/workspace/workspace.model";

class WorkspaceService {
  static async createWorkspace(
    name: string
  ): Promise<InstanceType<typeof Workspace>> {
    /**
     * (Create Workspace) Return : Workspace Object Containing Workspace Details
     */
    try {
      return await Workspace.create(name);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async deleteWorkspace(workspaceId: string): Promise<null> {
    /**
     * (Delete Workspace) Return : null
     */
    try {
      return await Workspace.findByIdAndDelete(workspaceId);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async updateWorkspace(workspaceId: string): Promise<any> {
    /**
     * (Update Workspace) Return : Workspace Object Containing Workspace Details
     */
    try {
      return await Workspace.findByIdAndUpdate(workspaceId);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getWorkspace(workspaceId: string): Promise<any> {
    /**
     * (Get Workspace By Id) Return : Workspace Object Containing Workspace Details
     */
    try {
      return await Workspace.findById(workspaceId);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default WorkspaceService;
