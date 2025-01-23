import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User extends mongoose.Document {
  name: string;
  email: string;
  refreshToken: string;
  password: string;
  workspaces: Workspace[];
  createdAt: Date;
  updatedAt: Date;
  isCorrectPassword: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

interface Workspace {
  name: string;
  user: mongoose.Schema.Types.ObjectId;
  private: boolean;
}

// We are Creating Info Schema Containing Basic Details of Workspace

const WorkspaceInfoSchema: mongoose.Schema<Workspace> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
});

const UserSchema: mongoose.Schema<User> = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    refreshToken: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Password is required "],
    },
    workspaces: [WorkspaceInfoSchema],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.isCorrectPassword = async function (password: string) {
  console.log(password, this.password);

  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string }
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string }
  );
};

export const User = mongoose.model("User", UserSchema);
