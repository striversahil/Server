import mongoose from "mongoose";

enum Role {
  admin = "admin",
  member = "member",
}

interface Member {
  member: mongoose.Schema.Types.ObjectId;
  role: Role;
}

export interface WorkspaceInterface extends mongoose.Document {
  name: string;
  user: mongoose.Schema.Types.ObjectId;
  private: boolean;
  members: Member[];
  buckets: mongoose.Types.ObjectId[]; // User Added Data from Sources
  projects: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema = new mongoose.Schema<WorkspaceInterface>(
  {
    name: {
      type: String,
      default: "Untitled Workspace",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    private: {
      type: Boolean,
      default: false,
    },
    buckets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bucket",
        required: true,
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    members: [
      {
        member: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: Object.values(Role),
          default: Role.member,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add default admin if not added
WorkspaceSchema.pre("save", function (next) {
  if (this.isModified("members")) return next();
  if (this.members.length > 0) return next();
  this.members.push({ member: this.user, role: Role.admin });
  next();
});

export const Workspace = mongoose.model("Workspace", WorkspaceSchema);
