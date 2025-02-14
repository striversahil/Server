/**
 * CodeBlock Service : It will Assume that You have done all the Validation Checks
 */

import { CodeBlock, CodeBlockSchema } from "@/models/project/codeblock.model";
import { Project } from "@/models/project/project.model";

class CodeBlockService {
  static async getAll(project_id: string): Promise<CodeBlockSchema[]> {
    try {
      const project = await Project.findById(project_id);
      if (!project) return [];
      return await CodeBlock.find({ _id: { $in: project.codeBlocks } }).sort({
        createdAt: -1,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getById(id: string): Promise<CodeBlockSchema | null> {
    try {
      return await CodeBlock.findById(id);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(project_id: string): Promise<CodeBlockSchema> {
    try {
      const newCodeBlock = new CodeBlock();
      await newCodeBlock.save();
      await Project.findByIdAndUpdate(project_id, {
        $push: {
          codeBlocks: newCodeBlock._id,
        },
      });
      return newCodeBlock;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  //   static async updateCodeBlock(id: string, codeBlock: typeof CodeBlock) {
  //     // Todo : Update Todo to some Strong UseCase
  //     return await CodeBlock.findByIdAndUpdate(id, codeBlock);
  //   }

  static async delete(
    id: string,
    project_id: string
  ): Promise<CodeBlockSchema | null> {
    try {
      const codeBlock = await CodeBlock.findByIdAndDelete(id);
      if (!codeBlock) return null;
      await Project.findByIdAndUpdate(project_id, {
        $pull: {
          codeBlocks: codeBlock._id,
        },
      });
      return codeBlock;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default CodeBlockService;
