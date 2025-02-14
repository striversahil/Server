import { CodeBlock } from "@/models/project/codeblock.model";

class CodeBlockService {
  static async getAllCodeBlocks() {
    return await CodeBlock.find();
  }

  static async getCodeBlockById(id: string) {
    return await CodeBlock.findById(id);
  }

  static createCodeBlock() {
    const newCodeBlock = new CodeBlock();
    return newCodeBlock.save();
  }

  static async updateCodeBlock(id: string, codeBlock: typeof CodeBlock) {
    // Todo : Update Todo to some Strong UseCase
    return await CodeBlock.findByIdAndUpdate(id, codeBlock);
  }

  static async deleteCodeBlock(id: string) {
    return await CodeBlock.findByIdAndDelete(id);
  }
}

export default CodeBlockService;
