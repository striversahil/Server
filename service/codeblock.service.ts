import { CodeBlock } from "@/models/project/codeblock.model";

type CodeType = {
  name: string;
  Code: string;
  language: string;
  output: string;
};

type CodeBlock = {
  name: string;
  steps: CodeType[];
};

class CodeBlockService {
  static getAllCodeBlocks() {
    return CodeBlock.find();
  }

  static getCodeBlockById(id: string) {
    return CodeBlock.findById(id);
  }

  static createCodeBlock(codeBlock: CodeBlock) {
    const newCodeBlock = new CodeBlock(codeBlock);
    return newCodeBlock.save();
  }

  static updateCodeBlock(id: string, codeBlock: CodeBlock) {
    return CodeBlock.findByIdAndUpdate(id, codeBlock);
  }
}

export default CodeBlockService;
