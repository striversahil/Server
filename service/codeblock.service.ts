/**
 * CodeBlock Service : It will Assume that You have done all the Validation Checks
 */

import {
  CodeBlock,
  CodeBlockSchema,
  CodeType,
} from "../models/project/codeblock.model";
import { Project } from "../models/project/project.model";

class CodeBlockService {
  static async getAll(project_id: string): Promise<any[]> {
    try {
      const project = await Project.findById(project_id).populate("codeBlocks");
      if (!project) return [];
      // Faced Day long Error Here due to Returning Codeblock.find({ _id: { $in: project.codeBlocks } })
      return project.codeBlocks;
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

  static async create(
    project_id: string,
    name: string
  ): Promise<CodeBlockSchema> {
    try {
      const newCodeBlock = new CodeBlock({
        name: name,
      });
      await Project.findByIdAndUpdate(project_id, {
        $push: {
          codeBlocks: newCodeBlock._id,
        },
      });
      await newCodeBlock.save();
      return newCodeBlock;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  //   static async updateCodeBlock(id: string, codeBlock: typeof CodeBlock) {
  //     // Todo : Update Todo to some Strong UseCase
  //     return await CodeBlock.findByIdAndUpdate(id, codeBlock);
  //   }

  static async updateName(id: string, name: string) {
    return await CodeBlock.findByIdAndUpdate(id, { name: name }, { new: true }); // New True : returns updated/new document : used for get new data immediately
  }

  static async addStep(
    id: string,
    step: number,
    slug: CodeType
  ): Promise<CodeBlockSchema | null> {
    try {
      const codeBlock = await CodeBlock.findById(id);
      const steps = codeBlock?.steps;
      if (!steps) return null;
      steps.splice(step, 0, slug);
      await codeBlock.save();
      console.log(steps);
      if (!codeBlock) return null;
      return codeBlock;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async delete(
    id: string,
    project_id: string
  ): Promise<CodeBlockSchema | null> {
    try {
      await Project.findByIdAndUpdate(project_id, {
        $pull: {
          codeBlocks: id,
        },
      });
      const codeBlock = await CodeBlock.findByIdAndDelete(id);
      if (!codeBlock) return null;
      return codeBlock;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default CodeBlockService;
