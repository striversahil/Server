import mongoose from "mongoose";

export interface CodeType {
  name: string;
  code: string;
  language: string;
  output: string;
}

interface RespnseTpe {
  type: string; //Synchronous or Streaming
  event_Handler: string; // Used For Frontend
}

interface TriggerType {
  Triggers: [string];
  Automatic: string; //Set Condition of trigger
  permission: string;
}

const CodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Untitled Code Block",
  },
  code: {
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

export interface CodeBlockSchema extends mongoose.Document {
  name: string;
  // Trigger: TriggerType;
  // Response: RespnseTpe;
  steps: CodeType[];
}

const CodeBlockSchema = new mongoose.Schema<CodeBlockSchema>(
  {
    name: {
      type: String,
      required: true,
      default: "Untitled Code Block",
    },
    // Trigger: {
    //   type: {
    //     Triggers: [String],
    //     Automatic: String,
    //     permission: String,
    //   },
    //   default: {
    //     Triggers: ["Test"],
    //     Automatic: "Test",
    //     permission: "Test",
    //   },
    // },
    // Response: {
    //   type: {
    //     type: String,
    //     event_Handler: String,
    //   },
    //   default: {
    //     type: "Test",
    //     event_Handler: "Test",
    //   },
    // },
    steps: {
      type: [CodeSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export const CodeBlock = mongoose.model("CodeBlock", CodeBlockSchema);
