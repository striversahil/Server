import mongoose from "mongoose";

interface RespnseTpe {
  type: string; //Synchronous or Streaming
  event_Handler: string; // Used For Frontend
}

interface TriggerType {
  Triggers: [string];
  Automatic: string; //Set Condition of trigger
  permission: string;
}

export interface CodeBlockSchema extends mongoose.Document {
  name: string;
  // Trigger: TriggerType;
  // Response: RespnseTpe;
  steps: mongoose.Types.ObjectId[];
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
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "StepBlock",
        },
      ],
    },
  },
  { timestamps: true }
);

export const CodeBlock = mongoose.model("CodeBlock", CodeBlockSchema);
