import { Project } from "../../models/project/project.model";
import { Section } from "../../models/project/section.model";

class SectionService {
  static async getAll(project_id: string): Promise<any | null> {
    try {
      const codeBlock = await Project.findById(project_id).populate("sections");
      return codeBlock;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getById(id: string): Promise<any | null> {
    try {
      return await Section.findById(id);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default SectionService;
