import { Workspace } from "@/models/workspace/workspace.model";
import { Project, ProjectInterface } from "../models/project/project.model";

class ProjectService {
  static async create(workspace_id: string): Promise<ProjectInterface | null> {
    try {
      const project = new Project();
      project.save();
      const workspace = Workspace.findByIdAndUpdate(workspace_id, {
        $push: { projects: project._id },
      });
      if (!workspace) return null;
      return project;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getAll(workspace_id: string): Promise<ProjectInterface[]> {
    try {
      const workspace = await Workspace.findById(workspace_id);
      if (!workspace) return [];
      return await Project.find({ _id: { $in: workspace.projects } }).sort({
        createdAt: -1,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getById(id: string): Promise<ProjectInterface | null> {
    try {
      return await Project.findById(id);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async delete(
    id: string,
    workspace_id: string
  ): Promise<ProjectInterface | null> {
    try {
      const project = await Project.findByIdAndDelete(id);
      if (!project) return null;
      await Workspace.findByIdAndUpdate(workspace_id, {
        $pull: {
          projects: id,
        },
      });
      return project;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default ProjectService;
