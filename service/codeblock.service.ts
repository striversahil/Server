/**
 * CodeBlock Service : It will Assume that You have done all the Validation Checks
 */

import { CodeBlock, CodeBlockSchema } from "@/models/project/codeblock.model";
import { Project } from "@/models/project/project.model";

class CodeBlockService {
  static async getAll(): Promise<CodeBlockSchema[]> {
    return await CodeBlock.find();
  }

  static async getById(id: string): Promise<CodeBlockSchema | null> {
    return await CodeBlock.findById(id);
  }

  static async create(project_id: string): Promise<CodeBlockSchema> {
    const newCodeBlock = new CodeBlock();
    await newCodeBlock.save();
    await Project.findByIdAndUpdate(project_id, {
      $push: {
        codeBlocks: newCodeBlock._id,
      },
    });
    return newCodeBlock;
  }

  //   static async updateCodeBlock(id: string, codeBlock: typeof CodeBlock) {
  //     // Todo : Update Todo to some Strong UseCase
  //     return await CodeBlock.findByIdAndUpdate(id, codeBlock);
  //   }

  static async delete(id: string): Promise<CodeBlockSchema | null> {
    return await CodeBlock.findByIdAndDelete(id);
  }
}

export default CodeBlockService;
