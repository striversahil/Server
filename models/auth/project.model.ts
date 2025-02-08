import mongoose from "mongoose";

interface ProjectInterface {
  name: string;
  details: string;
  buckets: mongoose.Types.ObjectId[];
  components: mongoose.Types.ObjectId[]; // Store Components coordinates and Settings for the User
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
