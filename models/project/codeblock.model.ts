import mongoose from "mongoose";

interface CodeType {
  name: string;
  Code: string;
  language: string;
  output: string;
}

const CodeSchema = new mongoose.Schema<CodeType>({
  name: {
    type: String,
    required: true,
    default: "Untitled Code Block",
  },
  Code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

type CodeBlockSchema = {
  name: string;
  steps: CodeType[];
};

const CodeBlockSchema = new mongoose.Schema<CodeBlockSchema>({
  name: {
    type: String,
    required: true,
    default: "Untitled Code Block",
  },
  steps: {
    type: [CodeSchema],
    required: true,
  },
});

export const CodeBlock = mongoose.model("CodeBlock", CodeBlockSchema);
