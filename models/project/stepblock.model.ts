import mongoose from "mongoose";

export interface StepBlockType extends mongoose.Document {
  name: string;
  code: string;
  language: string;
  output: string;
}

const StepBlockSchema = new mongoose.Schema<StepBlockType>({
  name: {
    type: String,
    required: true,
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

export const StepBlock = mongoose.model("StepBlock", StepBlockSchema);
