import { Section } from "../../models/project/section.model";

class ColumnService {
  static async getAll(section_id: string) {
    try {
      const section = await Section.findById(section_id).populate("columns");
      return section;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getById(id: string) {
    try {
      return await Section.findById(id);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default ColumnService;
