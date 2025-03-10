import { Project } from "../models/project/project.model";
import { Section } from "../models/project/section.model";
import SectionDefault from "../package/common/section_column/sectionDefault.json";

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

  static async create(project_id: string): Promise<any | null> {
    try {
      const newSection = new Section({
        name: "New Section",
        layout: SectionDefault.layout,
        appearence: SectionDefault.appearance,
      });
      await newSection.save();
      await Project.findByIdAndUpdate(project_id, {
        $push: {
          sections: newSection._id,
        },
      });
      return newSection;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async delete(
    section_id: string,
    project_id: string
  ): Promise<any | null> {
    try {
      const section = await Section.findByIdAndDelete(section_id);
      if (!section) return null;
      const project = await Project.findByIdAndUpdate(project_id, {
        $pull: {
          sections: section_id,
        },
      });
      if (!project) return null;
      return section;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default SectionService;
