import { Project as ProjectModel } from "../models/project/project.model";

class Project {
  static newProject() {
    try {
      const project = new ProjectModel();
      return project.save();
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
