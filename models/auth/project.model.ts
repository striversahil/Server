import mongoose from "mongoose";

interface ProjectInterface {
  name: string;
  details: string;
  created_by: mongoose.Schema.Types.ObjectId;
  workspace_id: mongoose.Schema.Types.ObjectId;
  buckets: mongoose.Schema.Types.ObjectId[];
  components: mongoose.Schema.Types.ObjectId[]; // Store Components coordinates and Settings for the User
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new mongoose.Schema<ProjectInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      default: "Some details about this project",
    },
    workspace_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    buckets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bucket",
        required: true,
      },
    ],
    components: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Component",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", ProjectSchema);
