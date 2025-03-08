import mongoose from "mongoose";

export interface ProjectInterface extends mongoose.Document {
  name: string;
  details: string;
  codeBlocks: mongoose.Types.ObjectId[];
  sections: mongoose.Types.ObjectId[];
  // columns: mongoose.Types.ObjectId[];
  // components: mongoose.Types.ObjectId[]; // Store Components coordinates and Settings for the User
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new mongoose.Schema<ProjectInterface>(
  {
    name: {
      type: String,
      default: "Untitled Project",
    },
    details: {
      type: String,
      default: "Some details about this project",
    },
    codeBlocks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodeBlock",
      },
    ],
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", ProjectSchema);
