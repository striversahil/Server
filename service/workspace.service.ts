import { Workspace } from "../models/auth/workspace.model";

class WorkspaceService {
  static async createWorkspace(
    name: string
  ): Promise<InstanceType<typeof Workspace>> {
    try {
      return await Workspace.create(name);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async deleteWorkspace(workspaceId: string): Promise<null> {
    try {
      return await Workspace.findByIdAndDelete(workspaceId);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async updateWorkspace(workspaceId: string): Promise<any> {
    try {
      return await Workspace.findByIdAndUpdate(workspaceId);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getWorkspace(workspaceId: string): Promise<any> {
    try {
      return await Workspace.findById(workspaceId);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default WorkspaceService;
